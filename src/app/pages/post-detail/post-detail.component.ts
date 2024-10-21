import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [BlogSidebarComponent, CommentsComponent, ContainerComponent, HeroComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit, AfterViewChecked {
  postSlug = input.required<string>();

  public content = '';

  highlighted = false;

  postMeta: PostMetadata = {
    title: '',  
    subtitle: '',
    date: '',  
    tags: [],
    comments_off: false,
  }

  comments_off = false;

  constructor(
    private titleService: Title, 
    private prismService: PrismService,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.getDetail();
  }


  ngAfterViewChecked() {
    if (!this.highlighted && this.content) {
      this.prismService.highlightAll()
      this.highlighted = true
    }
  }

  getDetail() {
    this.postService.getPostDetail(this.postSlug()).subscribe({
      next: ({ content, metadata }) => {
        this.content = content;
        this.postMeta = metadata;
        this.titleService.setTitle(`${metadata.title} | Davide Lombardo Blog`);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
