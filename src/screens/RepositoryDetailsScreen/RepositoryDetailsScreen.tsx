import React, { useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { LoadingSpinner } from "src/components/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "src/components/EmptyState/EmptyState";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { toggleFavorite } from "src/store/slices/repositoriesSlice";
import { fetchRepositoryDetails, clearRepositoryDetails } from "src/store/slices/repositoryDetailsSlice";
import { selectFavorites } from "src/store/selectors/repositoriesSelectors";
import {
  selectRepositoryDetails,
  selectRepositoryDetailsLoading,
  selectRepositoryDetailsError,
} from "src/store/selectors/repositoryDetailsSelectors";
import { RepositoryHeader } from "./components/RepositoryHeader/RepositoryHeader";
import { CustomHeader } from "./components/CustomHeader/CustomHeader";
import { RepositoryStats } from "./components/RepositoryStats/RepositoryStats";
import { RepositoryAbout } from "./components/RepositoryAbout/RepositoryAbout";
import { RepositoryLinks } from "./components/RepositoryLinks/RepositoryLinks";
import { useStyles } from "./RepositoryDetailsScreen.styles";

const RepositoryDetailsScreen = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const repositoryFullName = decodeURIComponent(params.repository as string);

  const repository = useAppSelector(selectRepositoryDetails);
  const isLoading = useAppSelector(selectRepositoryDetailsLoading);
  const error = useAppSelector(selectRepositoryDetailsError);
  const favorites = useAppSelector(selectFavorites);

  const isFavorite = repository ? favorites.includes(repository.id) : false;

  useEffect(() => {
    if (repositoryFullName) {
      dispatch(fetchRepositoryDetails(repositoryFullName));
    }

    return () => {
      dispatch(clearRepositoryDetails());
    };
  }, [repositoryFullName, dispatch]);

  const handleToggleFavorite = () => {
    if (repository) {
      dispatch(toggleFavorite(repository.id));
    }
  };

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <LoadingSpinner />
      </>
    );
  }

  if (error || !repository) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <EmptyState
          icon="alert-circle"
          message="Failed to load repository"
          description={error || "Repository not found"}
        />
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              title={repository.name}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <RepositoryHeader
          name={repository.name}
          owner={repository.owner.login}
          avatarUrl={repository.owner.avatar_url}
          isPrivate={repository.visibility === "private"}
          isFork={repository.fork}
        />

        {repository.description && (
          <Text style={styles.description}>{repository.description}</Text>
        )}

        <RepositoryStats
          stars={repository.stargazers_count}
          forks={repository.forks_count}
          watchers={repository.watchers_count}
          openIssues={repository.open_issues_count}
        />

        <RepositoryAbout
          language={repository.language}
          license={repository.license?.name}
          topics={repository.topics}
          createdAt={repository.created_at}
          updatedAt={repository.updated_at}
          defaultBranch={repository.default_branch}
          size={repository.size}
        />

        <RepositoryLinks
          htmlUrl={repository.html_url}
          homepage={repository.homepage}
        />
      </ScrollView>
    </>
  );
};

export default RepositoryDetailsScreen;
