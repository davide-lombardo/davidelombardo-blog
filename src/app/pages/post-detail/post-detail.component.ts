import { Component, OnDestroy, OnInit } from '@angular/core';
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
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  postSlug = '';
  content = '';

  highlighted = false;

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
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.postSlug = params.get('postSlug') || '';
      this.getDetail();
    });
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
}
