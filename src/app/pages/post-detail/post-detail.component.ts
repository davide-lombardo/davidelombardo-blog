import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BlogSidebarComponent } from '../../components/blog-sidebar/blog-sidebar.component';
import { CommentsComponent } from '../../components/comments/comments.component';
import { ContainerComponent } from '../../components/container/container.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { InfoPanelComponent } from '../../components/info-panel/info-panel.component';
import { PostDetail } from '../../models/post.model';
import { MetaService } from '../../services/meta.service';
import { PostService } from '../../services/post.service';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutComponent } from '../../components/scrollspy-nav-layout/scrollspy-nav-layout.component';
import { AnchorService } from '../../services/anchor.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    BlogSidebarComponent,
    CommentsComponent,
    ContainerComponent,
    HeroComponent,
    InfoPanelComponent,
    MarkdownModule,
    ScrollspyNavLayoutComponent,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  private destroy$: Subject<void> = new Subject();

  private contentRendered = false;
  private isBrowser = false;
  private postSlug = '';
  public content = '';
  public headings: Element[] | undefined;

  postMeta: PostDetail = {
    title: '',
    subtitle: '',
    date: '',
    tags: [],
    comments_off: false,
  };

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private postService: PostService,
    private metaService: MetaService,
    private anchorService: AnchorService,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('click', ['$event'])
  onComponentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if the clicked element is a link in the scrollspy nav
    if (target.tagName === 'A' && target.closest('.scrollspy-nav')) {
      const fragment = target.getAttribute('href')?.split('#')[1];
      if (fragment) {
        this.anchorService.scrollToAnchor(fragment);
      }
    }
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.postSlug = params.get('postSlug') || '';
      this.getDetail();
    });
  }

  ngAfterViewChecked(): void {
    // Skip DOM manipulation during SSR
    if (!this.isBrowser) {
      return;
    }

    // Wait until content is loaded before scanning for headings
    if (this.content && !this.contentRendered) {
      setTimeout(() => {
        this.setHeadings();
        this.contentRendered = true;

        this.handleFragment();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDetail(): void {
    this.postService
      .getPostDetail(this.postSlug)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ content, metadata }) => {
          this.content = content;
          this.postMeta = metadata;
          this.titleService.setTitle(
            `${metadata.title} | Davide Lombardo Blog`
          );

          // Reset the contentRendered flag to trigger a new scan for headings
          this.contentRendered = false;

          this.metaService.updateMetaTags({
            title: metadata.title,
            subtitle: metadata.subtitle,
            tags: metadata.tags,
          });
        },
        error: error => {
          console.error(error);
        },
      });
  }

  private setHeadings(): void {
    const container =
      this.elementRef.nativeElement.querySelector('.main-content');

    if (!container) {
      console.warn('Content container not found with class .main-content');
      return;
    }

    const headingElements = Array.from(container.querySelectorAll('h2'));

    // Ensure each heading has an ID for fragment navigation
    headingElements.forEach((heading, index) => {
      if (!heading.id) {
        const headingText = heading.textContent || '';
        const headingId = headingText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        heading.id = headingId || `heading-${index}`;
      }
    });

    this.headings = headingElements;
  }

  handleFragment(): void {
    this.anchorService.scrollToAnchor();
  }
}
