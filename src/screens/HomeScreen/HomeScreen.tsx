import React from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SearchInput } from "src/components/SearchInput/SearchInput";
import { LoadingSpinner } from "src/components/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "src/components/EmptyState/EmptyState";
import { FilterButton } from "./components/FilterButton/FilterButton";
import { RepositoryCard } from "./components/RepositoryCard/RepositoryCard";
import { GitHubRepository } from "src/types";
import { useRepositories } from "./hooks/useRepositories";
import { useRepositorySearch } from "./hooks/useRepositorySearch";
import { useFavorites } from "./hooks/useFavorites";
import { useStyles } from "./HomeScreen.styles";

const HomeScreen = () => {
  const styles = useStyles();
  
  // Custom hooks for business logic
  const { repositories, isLoading, error } = useRepositories();
  const { searchQuery, setSearchQuery, filteredRepositories } = useRepositorySearch(repositories);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFilterPress = () => {
    router.push('/filter');
  };

  const renderRepository = ({ item }: { item: GitHubRepository }) => (
    <RepositoryCard
      repository={item}
      isFavorite={isFavorite(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  const renderEmpty = () => (
    <EmptyState
      icon="search"
      message={searchQuery ? "No repositories found" : "No repositories available"}
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <View style={styles.searchInput}>
              <SearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search repositories..."
              />
            </View>
            <FilterButton onPress={handleFilterPress} />
          </View>
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
