import React from 'react';
import { View, Text } from 'react-native';
import { Chip } from 'src/components/Chip/Chip';
import { CheckboxItem } from 'src/components/CheckboxItem/CheckboxItem';
import { useStyles } from './MultiSelectField.styles';

export type SelectionType = 'checkbox' | 'chip';

interface MultiSelectFieldProps {
  label: string;
  options: Array<{ label: string; value: string }>;
  selectedValues: string[];
  onToggle: (value: string) => void;
  type?: SelectionType;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  options,
  selectedValues,
  onToggle,
  type = 'checkbox',
}) => {
  const styles = useStyles();

  const isSelected = (value: string) => selectedValues.includes(value);

  if (type === 'chip') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.chipsContainer}>
          {options.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              isSelected={isSelected(option.value)}
              onPress={() => onToggle(option.value)}
              testID={`chip-${option.value}`}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => (
        <CheckboxItem
          key={option.value}
          label={option.label}
          isSelected={isSelected(option.value)}
          onPress={() => onToggle(option.value)}
          testID={`checkbox-${option.value}`}
        />
      ))}
    </View>
  );
};

