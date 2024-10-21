import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Repository } from '../pages/projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = 'https://api.github.com/users/davide-lombardo/repos?per_page=100';

  constructor(private http: HttpClient) {}

  getRepositories(includePinned: boolean = false, pinnedRepoConfig: string[] = []): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.baseUrl).pipe(
      map(repos => this.filterPinnedRepos(repos, includePinned, pinnedRepoConfig))
    );
  }

  private filterPinnedRepos(repos: Repository[], includePinned: boolean, pinnedRepoConfig: string[]) {
    return repos
      .filter(repo => !repo.fork)
      .map(repo => ({
        ...repo,
        pinned: includePinned ? pinnedRepoConfig.includes(repo.id.toString()) : false,
      }))
      .filter(repo => !includePinned || repo.pinned); // Only include pinned repos if configured to do so
  }
}
