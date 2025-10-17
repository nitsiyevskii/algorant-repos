import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepositoryFilters } from 'src/types';
import { DEFAULT_FILTERS } from 'src/constants';

interface FiltersState extends RepositoryFilters {
  searchQuery: string;
}

const initialState: FiltersState = {
  ...DEFAULT_FILTERS,
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleOrganization: (state, action: PayloadAction<string>) => {
      const org = action.payload;
      const index = state.organizations.indexOf(org);
      
      if (index === -1) {
        state.organizations.push(org);
      } else {
        state.organizations.splice(index, 1);
      }
    },
    toggleLanguage: (state, action: PayloadAction<string>) => {
      const lang = action.payload;
      const index = state.languages.indexOf(lang);
      
      if (index === -1) {
        state.languages.push(lang);
      } else {
        state.languages.splice(index, 1);
      }
    },
    setStarRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.stars = action.payload;
    },
    setStarMin: (state, action: PayloadAction<number | null>) => {
      state.stars.min = action.payload;
    },
    setStarMax: (state, action: PayloadAction<number | null>) => {
      state.stars.max = action.payload;
    },
    setForkRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.forks = action.payload;
    },
    setForkMin: (state, action: PayloadAction<number | null>) => {
      state.forks.min = action.payload;
    },
    setForkMax: (state, action: PayloadAction<number | null>) => {
      state.forks.max = action.payload;
    },
    resetFilters: (state) => {
      state.organizations = DEFAULT_FILTERS.organizations;
      state.languages = DEFAULT_FILTERS.languages;
      state.stars = DEFAULT_FILTERS.stars;
      state.forks = DEFAULT_FILTERS.forks;
    },
    resetAllFilters: () => initialState,
  },
});

export const {
  setSearchQuery,
  toggleOrganization,
  toggleLanguage,
  setStarRange,
  setStarMin,
  setStarMax,
  setForkRange,
  setForkMin,
  setForkMax,
  resetFilters,
  resetAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

