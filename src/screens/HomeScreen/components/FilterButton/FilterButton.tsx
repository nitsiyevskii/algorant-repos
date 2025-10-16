import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks/useTheme';
import { useStyles } from './FilterButton.styles';

interface FilterButtonProps {
  onPress: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="filter" size={20} color={theme.colors.iconButton.icon} />
      <Text style={styles.text}>Filter</Text>
    </TouchableOpacity>
  );
};

