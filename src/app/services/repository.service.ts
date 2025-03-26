import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Repository } from '../pages/projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = 'https://api.github.com/users/davide-lombardo/repos?per_page=100';

  constructor(private http: HttpClient) {}

  getRepositories(includePinned: boolean = false, pinnedRepoConfig: string[] = []): Observable<Repository[]> {
    // sort by created date in descending order
    const url = `${this.baseUrl}?per_page=100&sort=created&direction=desc`;

    return this.http.get<Repository[]>(url).pipe(
      map(repos => this.filterRepos(repos, includePinned, pinnedRepoConfig)),
      shareReplay(1)
    );
  }

  private filterRepos(repos: Repository[], includePinned: boolean, pinnedRepoConfig: string[]): Repository[] {
    // Filter out forked repositories
    const nonForkedRepos = repos.filter(repo => !repo.fork);
    
    // Find repos that should be pinned
    const pinnedRepos = nonForkedRepos.filter(repo => {
      const isIncluded = pinnedRepoConfig.includes(repo.id.toString());
      return isIncluded;
    });
    
    if (includePinned) {
      return pinnedRepos;
    }
    
    return nonForkedRepos;
  }
}