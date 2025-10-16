import { useState, useEffect, useMemo } from 'react';
import { GitHubRepository } from 'src/types';

export const useRepositorySearch = (repositories: GitHubRepository[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRepositories = useMemo(() => {
    if (!searchQuery.trim()) {
      return repositories;
    }

    const query = searchQuery.toLowerCase();
    return repositories.filter((repo) =>
      repo.name.toLowerCase().includes(query) ||
      repo.description?.toLowerCase().includes(query) ||
      repo.owner.login.toLowerCase().includes(query)
    );
  }, [searchQuery, repositories]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredRepositories,
    hasResults: filteredRepositories.length > 0,
  };
};

