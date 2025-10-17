import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useStyles } from './Chip.styles';

interface ChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  testID?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  isSelected,
  onPress,
  testID,
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipActive]}
      onPress={onPress}
      testID={testID}
    >
      <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

