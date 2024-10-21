import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, take } from 'rxjs';
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
export class ProjectsComponent {
  title = 'projects';
  description = "projects I've made over the years, including this website, and various apps";

  repos: Repository[] = [];

  constructor(private http: HttpClient, private repositoryService: RepositoryService) {}


  ngOnInit(): void {
    this.loadProjects(false);
    this.http.get<Repository[]>('https://api.github.com/users/davide-lombardo/repos?per_page=100').pipe(
      take(1),
      map(data => data.filter(repo => !repo.fork))
    ).subscribe((data) => {
      // console.log(data);
      this.repos = data;
    });
  }

  private loadProjects(includePinned: boolean): void {
    this.repositoryService.getRepositories(includePinned).subscribe({
      next: data => this.repos = data,
      error: error => console.error('Error loading projects:', error),
    });
  }
}
