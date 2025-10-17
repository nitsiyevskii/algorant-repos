import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks/useTheme';
import { useStyles } from './FilterButton.styles';

interface FilterButtonProps {
  onPress: () => void;
  hasActiveFilters?: boolean;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onPress, hasActiveFilters = false }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View>
        <Ionicons 
          name="filter" 
          size={20} 
          color={hasActiveFilters ? theme.colors.core.primary : theme.colors.iconButton.icon} 
        />
        {hasActiveFilters && <View style={styles.badge} />}
      </View>
      <Text style={[styles.text, hasActiveFilters && styles.activeText]}>Filter</Text>
    </TouchableOpacity>
  );
};

