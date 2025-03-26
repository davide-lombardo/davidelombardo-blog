import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { PostListComponent } from "../../components/post-list/post-list.component";
import { ContainerComponent } from "../../components/container/container.component";
import { PostService } from '../../services/post.service';
import { PostMetadata } from '../../models/post.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [HeroComponent, PostListComponent, ContainerComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  
  posts = signal<PostMetadata[]>([])
  title = 'articles';
  description = 'guides, references, and tutorials on programming, web development, and design.';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPosts(getLatest: boolean): void {
    this.postService.getPostMetadata(getLatest).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (posts) => {
        this.posts.set(posts);
      },
      error: error => console.error('Error loading post metadata:', error),
    });
  }

}
