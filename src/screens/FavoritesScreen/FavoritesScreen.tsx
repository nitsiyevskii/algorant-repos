import React from "react";
import { View, FlatList } from "react-native";
import { EmptyState } from "src/components/EmptyState/EmptyState";
import { RepositoryCard } from "src/components/RepositoryCard/RepositoryCard";
import { GitHubRepository } from "src/types";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { toggleFavorite } from "src/store/slices/repositoriesSlice";
import {
  selectFavoriteRepositories,
  selectFavorites,
} from "src/store/selectors/repositoriesSelectors";
import { useStyles } from "./FavoritesScreen.styles";

const FavoritesScreen = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const favoriteRepositories = useAppSelector(selectFavoriteRepositories);
  const favorites = useAppSelector(selectFavorites);

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const renderRepository = ({ item }: { item: GitHubRepository }) => (
    <RepositoryCard
      repository={item}
      isFavorite={isFavorite(item.id)}
      onToggleFavorite={() => handleToggleFavorite(item.id)}
    />
  );

  const renderEmpty = () => (
    <EmptyState
      icon="heart-outline"
      message="No favorites yet"
      description="Star repositories to see them here"
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteRepositories}
        renderItem={renderRepository}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

export default FavoritesScreen;
