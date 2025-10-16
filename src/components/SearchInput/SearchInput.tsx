import React from 'react';
import { TextInput } from 'src/components/TextInput/TextInput';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  disabled = false,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      leftIcon="search"
      showClearButton={true}
      disabled={disabled}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};

