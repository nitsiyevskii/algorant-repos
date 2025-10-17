import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SearchInput } from "src/components/SearchInput/SearchInput";
import { LoadingSpinner } from "src/components/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "src/components/EmptyState/EmptyState";
import { RepositoryCard } from "src/components/RepositoryCard/RepositoryCard";
import { FilterButton } from "./components/FilterButton/FilterButton";
import { GitHubRepository } from "src/types";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  fetchRepositories,
  toggleFavorite,
} from "src/store/slices/repositoriesSlice";
import { setSearchQuery } from "src/store/slices/filtersSlice";
import {
  selectFilteredRepositories,
  selectIsLoading,
  selectError,
  selectSearchQuery,
  selectFavorites,
  selectHasActiveFilters,
} from "src/store/selectors/repositoriesSelectors";
import { useStyles } from "./HomeScreen.styles";

const HomeScreen = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const filteredRepositories = useAppSelector(selectFilteredRepositories);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const searchQuery = useAppSelector(selectSearchQuery);
  const favorites = useAppSelector(selectFavorites);
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);

  useEffect(() => {
    dispatch(fetchRepositories());
  }, [dispatch]);

  const handleFilterPress = () => {
    router.push("/filter");
  };

  const handleSearchChange = (text: string) => {
    dispatch(setSearchQuery(text));
  };

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
      icon="search"
      message={
        searchQuery ? "No repositories found" : "No repositories available"
      }
      description={searchQuery ? "Try adjusting your search" : undefined}
    />
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <EmptyState
        icon="alert-circle"
        message="Failed to load repositories"
        description={error}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <SearchInput
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search repositories..."
            />
          </View>
          <FilterButton
            onPress={handleFilterPress}
            hasActiveFilters={hasActiveFilters}
          />
        </View>

        <FlatList
          data={filteredRepositories}
          renderItem={renderRepository}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
