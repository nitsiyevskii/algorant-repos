import { useState, useCallback } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = useCallback((repoId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(repoId)) {
        newFavorites.delete(repoId);
      } else {
        newFavorites.add(repoId);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((repoId: number) => {
    return favorites.has(repoId);
  }, [favorites]);

  const addFavorite = useCallback((repoId: number) => {
    setFavorites((prev) => new Set(prev).add(repoId));
  }, []);

  const removeFavorite = useCallback((repoId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(repoId);
      return newFavorites;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    favoriteCount: favorites.size,
  };
};

