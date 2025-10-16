import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from 'src/components/TextInput/TextInput';

describe('TextInput', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(
      <TextInput value="" onChangeText={mockOnChangeText} />
    );
    
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <TextInput
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Custom placeholder"
      />
    );
    
    expect(getByPlaceholderText('Custom placeholder')).toBeTruthy();
  });

  it('displays the current value', () => {
    const { getByDisplayValue } = render(
      <TextInput value="test value" onChangeText={mockOnChangeText} />
    );
    
    expect(getByDisplayValue('test value')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(
      <TextInput value="" onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Search...');
    fireEvent.changeText(input, 'new text');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('shows clear button when value is not empty', () => {
    const { queryByTestId, rerender } = render(
      <TextInput value="" onChangeText={mockOnChangeText} />
    );
    
    rerender(<TextInput value="some text" onChangeText={mockOnChangeText} />);
    
    const clearButton = queryByTestId('clear-button');
    expect(clearButton).toBeTruthy();
  });

  it('clears text when clear button is pressed', () => {
    const { getByTestId } = render(
      <TextInput value="some text" onChangeText={mockOnChangeText} />
    );
    
    const clearButton = getByTestId('clear-button');
    fireEvent.press(clearButton);
    
    expect(mockOnChangeText).toHaveBeenCalledWith('');
  });

  it('is disabled when disabled prop is true', () => {
    const { getByTestId } = render(
      <TextInput
        value=""
        onChangeText={mockOnChangeText}
        disabled={true}
      />
    );
    
    const input = getByTestId('text-input');
    expect(input.props.editable).toBe(false);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <TextInput value="test" onChangeText={mockOnChangeText} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

