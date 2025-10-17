import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from 'src/hooks/useTheme';
import { FavoriteButton } from 'src/components/FavoriteButton/FavoriteButton';
import { GitHubRepository } from 'src/types/github';
import { useStyles } from './RepositoryCard.styles';

interface RepositoryCardProps {
  repository: GitHubRepository;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  isFavorite,
  onToggleFavorite,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const handlePress = () => {
    router.push(`/repository/${encodeURIComponent(repository.full_name)}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {repository.name}
          </Text>
          <Text style={styles.owner} numberOfLines={1}>
            {repository.owner.login}
          </Text>
        </View>
        <FavoriteButton isSelected={isFavorite} onPress={onToggleFavorite} />
      </View>

      {repository.description && (
        <Text style={styles.description} numberOfLines={2}>
          {repository.description}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.stat}>
          <Ionicons name="star" size={16} color={theme.colors.text.tertiary} />
          <Text style={styles.statText}>{repository.stargazers_count}</Text>
        </View>

        {repository.language && (
          <View style={styles.stat}>
            <View
              style={[styles.languageDot, { backgroundColor: theme.colors.core.primary }]}
            />
            <Text style={styles.statText}>{repository.language}</Text>
          </View>
        )}

        <View style={styles.stat}>
          <Ionicons name="git-branch" size={16} color={theme.colors.text.tertiary} />
          <Text style={styles.statText}>{repository.forks_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

