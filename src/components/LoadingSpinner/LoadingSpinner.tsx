import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { useStyles } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container} testID="loading-spinner">
      <ActivityIndicator
        size={size}
        color={color || theme.colors.core.primary}
        testID="activity-indicator"
      />
    </View>
  );
};

