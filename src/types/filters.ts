export interface RepositoryFilters {
  organizations: string[];
  languages: string[];
  stars: {
    min: number | null;
    max: number | null;
  };
  forks: {
    min: number | null;
    max: number | null;
  };
}

