import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { Repository } from './project.model';
import { ContainerComponent } from "../../components/container/container.component";
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeroComponent, RouterLink, DatePipe, ContainerComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject();
  
  title = 'projects';
  description = "projects I've made over the years, including this website, and various apps";

  repos: Repository[] = [];

  constructor(private repositoryService: RepositoryService) {}

  ngOnInit(): void {
    this.loadProjects(false);
  }
  
  private loadProjects(includePinned: boolean): void {
    const excludedIds = [875256135, 447157387]; // Array of excluded IDs
  
    this.repositoryService.getRepositories(includePinned).pipe(
      map(data => data.filter(repo => !repo.fork && !excludedIds.includes(repo.id))),
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => this.repos = data,
      error: error => console.error('Error loading projects:', error),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
