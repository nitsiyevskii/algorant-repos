import { RepositoryFilters } from 'src/types/filters';

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

export const AVAILABLE_LANGUAGES: Array<{ label: string; value: string }> = [
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'Python', value: 'Python' },
  { label: 'Go', value: 'Go' },
  { label: 'Java', value: 'Java' },
  { label: 'Rust', value: 'Rust' },
  { label: 'Swift', value: 'Swift' },
  { label: 'Kotlin', value: 'Kotlin' },
];

