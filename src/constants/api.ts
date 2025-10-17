export const GITHUB_API_BASE_URL = 'https://api.github.com';

export const GITHUB_API_ENDPOINTS = {
  orgRepos: (org: string) => `${GITHUB_API_BASE_URL}/orgs/${org}/repos`,
  repo: (owner: string, repo: string) => `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}`,
} as const;

export const API_CONFIG = {
  perPage: 100,
} as const;

