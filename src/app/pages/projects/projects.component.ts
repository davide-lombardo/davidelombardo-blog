import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { DatePipe } from '@angular/common';
import { map, Subject, takeUntil } from 'rxjs';
import { Repository } from './project.model';
import { ContainerComponent } from '../../components/container/container.component';
import { RepositoryService } from '../../services/repository.service';
import { ProjectSkeletonComponent } from '../../components/skeleton/project-skeleton.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    HeroComponent,
    DatePipe,
    ContainerComponent,
    ProjectSkeletonComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  private repositoryService = inject(RepositoryService);

  isLoading = false;
  skeletonArray = new Array(6);

  title = 'projects';
  description =
    "projects I've made over the years, including this website, and various apps";

  repos: Repository[] = [];

  ngOnInit(): void {
    this.loadProjects(false);
  }

  private loadProjects(includePinned: boolean): void {
    this.isLoading = true;
    const excludedIds = [875256135, 447157387]; // Array of excluded IDs

    this.repositoryService
      .getRepositories(includePinned)
      .pipe(
        map(data =>
          data.filter(repo => !repo.fork && !excludedIds.includes(repo.id))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: data => {
          this.isLoading = false;
          this.repos = data;
        },
        error: error => {
          this.isLoading = false;
          console.error('Error loading projects:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
