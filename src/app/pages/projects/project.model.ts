export interface RepositoryOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
}

export interface BaseRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  homepage: string;
  private: boolean;
  owner: RepositoryOwner;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  visibility: string;
  default_branch: string;
}

export interface ForkedRepository extends BaseRepository {
  fork: true;
  parent_repo_url: string;
}

export interface ArchivedRepository extends BaseRepository {
  archived: true;
  archived_at: string;
}

export type Repository = BaseRepository | ForkedRepository | ArchivedRepository;