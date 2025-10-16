import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks/useTheme';
import { useStyles } from './TextInput.styles';

interface TextInputProps extends Omit<RNTextInputProps, 'onChange'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  showClearButton?: boolean;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  leftIcon = 'search',
  showClearButton = true,
  disabled = false,
  ...rest
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View
      style={[
        styles.container,
        { opacity: disabled ? 0.6 : 1 },
      ]}
    >
      {leftIcon && (
        <View style={styles.leftIconContainer}>
          <Ionicons
            name={leftIcon}
            size={20}
            color={theme.colors.input.placeholder}
          />
        </View>
      )}

      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.input.placeholder}
        editable={!disabled}
        testID="text-input"
        {...rest}
      />

      {showClearButton && value.length > 0 && !disabled && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          activeOpacity={0.7}
          testID="clear-button"
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={theme.colors.input.placeholder}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

