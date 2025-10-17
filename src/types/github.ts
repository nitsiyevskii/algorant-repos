export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  homepage?: string | null;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  visibility: string;
  default_branch: string;
  size?: number;
  license?: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
}

export interface GitHubOrganization {
  login: string;
  id: number;
  avatar_url: string;
  description: string;
  name: string;
  repos_url: string;
}

export type FilterOrganization = 'all' | 'perawallet' | 'algorandfoundation' | 'algorand';

