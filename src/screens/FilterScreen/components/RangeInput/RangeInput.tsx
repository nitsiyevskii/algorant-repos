import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTheme } from "src/hooks/useTheme";
import { parsePositiveInteger } from "src/utils/number";
import { useStyles } from "./RangeInput.styles";

interface RangeInputProps {
  label: string;
  minValue: number | null;
  maxValue: number | null;
  onMinChange: (value: number | null) => void;
  onMaxChange: (value: number | null) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder = "0",
  maxPlaceholder = "∞",
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const handleMinChange = (text: string) => {
    const value = parsePositiveInteger(text);
    onMinChange(value);
  };

  const handleMaxChange = (text: string) => {
    const value = parsePositiveInteger(text);
    onMaxChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rangeContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Min</Text>
          <TextInput
            style={styles.input}
            value={minValue?.toString() || ""}
            onChangeText={handleMinChange}
            placeholder={minPlaceholder}
            placeholderTextColor={theme.colors.input.placeholder}
            keyboardType="number-pad"
            testID={`range-input-min-${label.toLowerCase()}`}
          />
        </View>
        <Text style={styles.separator}>-</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Max</Text>
          <TextInput
            style={styles.input}
            value={maxValue?.toString() || ""}
            onChangeText={handleMaxChange}
            placeholder={maxPlaceholder}
            placeholderTextColor={theme.colors.input.placeholder}
            keyboardType="number-pad"
            testID={`range-input-max-${label.toLowerCase()}`}
          />
        </View>
      </View>
    </View>
  );
};
