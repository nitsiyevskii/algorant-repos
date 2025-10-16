import { useState, useEffect } from 'react';
import { GitHubRepository } from 'src/types';
import { ORGANIZATIONS } from 'src/constants';

export const useRepositories = () => {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const orgs = [
        ORGANIZATIONS.perawallet,
        ORGANIZATIONS.algorandfoundation,
        ORGANIZATIONS.algorand,
      ];

      const promises = orgs.map((org) =>
        fetch(`https://api.github.com/orgs/${org}/repos?per_page=100`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch from ${org}`);
            }
            return res.json();
          })
      );

      const results = await Promise.all(promises);
      const allRepos = results.flat();
      
      // Sort by stars descending
      allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      setRepositories(allRepos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch repositories';
      setError(errorMessage);
      console.error('Error fetching repositories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return {
    repositories,
    isLoading,
    error,
    refetch: fetchRepositories,
  };
};

