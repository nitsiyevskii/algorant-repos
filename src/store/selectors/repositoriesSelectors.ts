import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'src/store';
import { GitHubRepository } from 'src/types';

export const selectRepositories = (state: RootState) => state.repositories.items;
export const selectFavorites = (state: RootState) => state.repositories.favorites;
export const selectIsLoading = (state: RootState) => state.repositories.isLoading;
export const selectError = (state: RootState) => state.repositories.error;
export const selectLastFetched = (state: RootState) => state.repositories.lastFetched;

export const selectSearchQuery = (state: RootState) => state.filters.searchQuery;
export const selectOrganizationFilters = (state: RootState) => state.filters.organizations;
export const selectLanguageFilters = (state: RootState) => state.filters.languages;
export const selectStarFilters = (state: RootState) => state.filters.stars;
export const selectForkFilters = (state: RootState) => state.filters.forks;

export const selectFavoriteRepositories = createSelector(
  [selectRepositories, selectFavorites],
  (repositories, favorites) => {
    return repositories.filter((repo: GitHubRepository) => favorites.includes(repo.id));
  }
);

export const selectFilteredRepositories = createSelector(
  [
    selectRepositories,
    selectSearchQuery,
    selectOrganizationFilters,
    selectLanguageFilters,
    selectStarFilters,
    selectForkFilters,
  ],
  (repositories, searchQuery, organizations, languages, stars, forks) => {
    let filtered = repositories;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (repo: GitHubRepository) =>
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query) ||
          repo.owner.login.toLowerCase().includes(query)
      );
    }

    if (organizations.length > 0) {
      filtered = filtered.filter((repo: GitHubRepository) =>
        organizations.includes(repo.owner.login)
      );
    }

    if (languages.length > 0) {
      filtered = filtered.filter((repo: GitHubRepository) =>
        repo.language && languages.includes(repo.language)
      );
    }

    if (stars.min !== null) {
      filtered = filtered.filter((repo: GitHubRepository) => repo.stargazers_count >= stars.min!);
    }

    if (stars.max !== null) {
      filtered = filtered.filter((repo: GitHubRepository) => repo.stargazers_count <= stars.max!);
    }

    if (forks.min !== null) {
      filtered = filtered.filter((repo: GitHubRepository) => repo.forks_count >= forks.min!);
    }

    if (forks.max !== null) {
      filtered = filtered.filter((repo: GitHubRepository) => repo.forks_count <= forks.max!);
    }

    return filtered;
  }
);

export const selectHasActiveFilters = createSelector(
  [selectOrganizationFilters, selectLanguageFilters, selectStarFilters, selectForkFilters],
  (organizations, languages, stars, forks) => {
    return (
      organizations.length > 0 ||
      languages.length > 0 ||
      stars.min !== null ||
      stars.max !== null ||
      forks.min !== null ||
      forks.max !== null
    );
  }
);

export const selectActiveFilterCount = createSelector(
  [selectOrganizationFilters, selectLanguageFilters, selectStarFilters, selectForkFilters],
  (organizations, languages, stars, forks) => {
    let count = 0;
    
    if (organizations.length > 0) count++;
    if (languages.length > 0) count++;
    if (stars.min !== null || stars.max !== null) count++;
    if (forks.min !== null || forks.max !== null) count++;
    
    return count;
  }
);

