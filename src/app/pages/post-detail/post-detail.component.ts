import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, input, OnDestroy, OnInit } from '@angular/core';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter-browser';
import { BlogSidebarComponent } from "../../components/blog-sidebar/blog-sidebar.component";
import { CommentsComponent } from "../../components/comments/comments.component";
import { ContainerComponent } from "../../components/container/container.component";
import { Title } from '@angular/platform-browser';
import { HeroComponent } from "../../components/hero/hero.component";
import { PrismService } from '../../services/prism.service';
import { PostService } from '../../services/post.service';
import { PostMetadata } from '../../models/post.model';
import { MetaService } from '../../services/meta.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { InfoPanelComponent } from "../../components/info-panel/info-panel.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [BlogSidebarComponent, CommentsComponent, ContainerComponent, HeroComponent, InfoPanelComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit, AfterViewChecked, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  postSlug = '';
  content = '';

  highlighted = false;

  postMeta: PostMetadata = {
    title: '',  
    subtitle: '',
    date: '',  
    tags: [],
    comments_off: false,
  }

  constructor(
    private titleService: Title, 
    private route: ActivatedRoute,
    private prismService: PrismService,
    private postService: PostService,
    private metaService: MetaService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.postSlug = params.get('postSlug') || '';
      this.getDetail()
    });
  }


  ngAfterViewChecked() {
    if (!this.highlighted && this.content) {
      this.prismService.highlightAll()
      this.highlighted = true
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDetail() {
    this.postService.getPostDetail(this.postSlug).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({ content, metadata }) => {
        this.content = content;
        this.postMeta = metadata;
        this.titleService.setTitle(`${metadata.title} | Davide Lombardo Blog`);

        this.metaService.updateMetaTags({
          title: metadata.title,
          subtitle: metadata.subtitle,
          tags: metadata.tags,
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
