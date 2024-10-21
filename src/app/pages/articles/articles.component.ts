import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeroComponent } from "../../components/hero/hero.component";
import { PostListComponent } from "../../components/post-list/post-list.component";
import { ContainerComponent } from "../../components/container/container.component";
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink, DatePipe, HeroComponent, PostListComponent, ContainerComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent implements OnInit {
  posts = signal<Post[]>([])
  title = 'articles';
  description = 'guides, references, and tutorials on programming, web development, and design.';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts(false);
  }

  private loadPosts(getLatest: boolean): void {
    this.postService.getPostMetadata(getLatest).subscribe({
      next: (posts) => {
        this.posts.set(posts);
      },
      error: error => console.error('Error loading post metadata:', error),
    });
  }

}
