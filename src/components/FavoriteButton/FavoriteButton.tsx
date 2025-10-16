import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks/useTheme';
import { useStyles } from './FavoriteButton.styles';

interface FavoriteButtonProps {
  isSelected: boolean;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isSelected,
  onPress,
  size = 24,
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        { opacity: disabled ? 0.5 : 1 },
      ]}
      activeOpacity={0.7}
      testID="favorite-button"
    >
      <Ionicons
        name={isSelected ? 'heart' : 'heart-outline'}
        size={size}
        color={isSelected ? theme.colors.core.error : theme.colors.iconButton.icon}
      />
    </TouchableOpacity>
  );
};

