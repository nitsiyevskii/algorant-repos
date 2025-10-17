import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks/useTheme';
import { useStyles } from './CheckboxItem.styles';

interface CheckboxItemProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  testID?: string;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  label,
  isSelected,
  onPress,
  testID,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID={testID}
    >
      <View style={styles.checkbox}>
        {isSelected && (
          <Ionicons name="checkmark" size={18} color={theme.colors.core.primary} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

