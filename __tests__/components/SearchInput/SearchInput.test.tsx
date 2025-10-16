import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from 'src/components/SearchInput/SearchInput';

describe('SearchInput', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={mockOnChangeText} />
    );
    
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search repositories..."
      />
    );
    
    expect(getByPlaceholderText('Search repositories...')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Search...');
    fireEvent.changeText(input, 'search query');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('search query');
  });

  it('displays current value', () => {
    const { getByDisplayValue } = render(
      <SearchInput value="test" onChangeText={mockOnChangeText} />
    );
    
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByTestId } = render(
      <SearchInput value="" onChangeText={mockOnChangeText} disabled={true} />
    );
    
    const input = getByTestId('text-input');
    expect(input.props.editable).toBe(false);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <SearchInput value="test" onChangeText={mockOnChangeText} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

