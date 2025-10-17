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

export const DEFAULT_FILTERS: RepositoryFilters = {
  organizations: [],
  languages: [],
  stars: {
    min: null,
    max: null,
  },
  forks: {
    min: null,
    max: null,
  },
};

