import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks/useTheme';
import { useStyles } from './EmptyState.styles';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  message: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search',
  message,
  description,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={theme.colors.text.tertiary} />
      <Text style={styles.message}>{message}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

