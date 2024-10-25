import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { HeadingComponent } from '../../components/heading/heading.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { Repository } from '../projects/project.model';
import { PostService } from '../../services/post.service';
import { RepositoryService } from '../../services/repository.service';
import { Subject, takeUntil } from 'rxjs';

export type HomeData = {
  posts: string[];
  notes: string[];
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    HeadingComponent,
    PostListComponent,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  
  projectsList: Repository[] = [];

  posts: Post[] = [];
  notes: Post[] = [];

  pinnedRepoConfig = [
    '401067811',
    '440639684',
    '463276952',
  ];

  constructor(
    private postService: PostService,
    private repositoryService: RepositoryService
  ) {}

  ngOnInit() {
    this.loadPosts(true);
    this.loadPinnedProjects(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPosts(getLatest: boolean): void {
    this.postService.getPostMetadata(getLatest).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: error => console.error('Error loading post metadata:', error),
    });
  }

  private loadPinnedProjects(includePinned: boolean): void {
    this.repositoryService.getRepositories(includePinned, this.pinnedRepoConfig).subscribe({
      next: data => this.projectsList = data,
      error: error => console.error('Error loading projects:', error),
    });
  }
}
