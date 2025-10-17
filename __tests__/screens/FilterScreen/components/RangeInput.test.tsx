import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RangeInput } from 'src/screens/FilterScreen/components/RangeInput/RangeInput';

describe('RangeInput', () => {
  const mockOnMinChange = jest.fn();
  const mockOnMaxChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(
      <RangeInput
        label="Stars"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    expect(getByText('Stars')).toBeTruthy();
    expect(getByText('Min')).toBeTruthy();
    expect(getByText('Max')).toBeTruthy();
  });

  it('displays current min and max values', () => {
    const { getByDisplayValue } = render(
      <RangeInput
        label="Forks"
        minValue={10}
        maxValue={100}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    expect(getByDisplayValue('10')).toBeTruthy();
    expect(getByDisplayValue('100')).toBeTruthy();
  });

  it('displays empty inputs when values are null', () => {
    const { getByTestId } = render(
      <RangeInput
        label="Stars"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    const minInput = getByTestId('range-input-min-stars');
    const maxInput = getByTestId('range-input-max-stars');

    expect(minInput.props.value).toBe('');
    expect(maxInput.props.value).toBe('');
  });

  it('calls onMinChange with valid positive integer', () => {
    const { getByTestId } = render(
      <RangeInput
        label="Stars"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    const minInput = getByTestId('range-input-min-stars');
    fireEvent.changeText(minInput, '50');

    expect(mockOnMinChange).toHaveBeenCalledWith(50);
  });

  it('calls onMaxChange with valid positive integer', () => {
    const { getByTestId } = render(
      <RangeInput
        label="Forks"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    const maxInput = getByTestId('range-input-max-forks');
    fireEvent.changeText(maxInput, '200');

    expect(mockOnMaxChange).toHaveBeenCalledWith(200);
  });

  it('calls onMinChange with null for empty string', () => {
    const { getByTestId } = render(
      <RangeInput
        label="Stars"
        minValue={10}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    const minInput = getByTestId('range-input-min-stars');
    fireEvent.changeText(minInput, '');

    expect(mockOnMinChange).toHaveBeenCalledWith(null);
  });

  it('calls onMinChange with null for invalid input', () => {
    const { getByTestId } = render(
      <RangeInput
        label="Stars"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    const minInput = getByTestId('range-input-min-stars');
    fireEvent.changeText(minInput, 'abc');

    expect(mockOnMinChange).toHaveBeenCalledWith(null);
  });

  it('calls onMinChange with null for negative numbers', () => {
    const { getByTestId } = render(
      <RangeInput
        label="Stars"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    const minInput = getByTestId('range-input-min-stars');
    fireEvent.changeText(minInput, '-5');

    expect(mockOnMinChange).toHaveBeenCalledWith(null);
  });

  it('calls onMinChange with null for zero', () => {
    const { getByTestId } = render(
      <RangeInput
        label="Stars"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    const minInput = getByTestId('range-input-min-stars');
    fireEvent.changeText(minInput, '0');

    expect(mockOnMinChange).toHaveBeenCalledWith(null);
  });

  it('uses custom placeholders', () => {
    const { getByPlaceholderText } = render(
      <RangeInput
        label="Custom"
        minValue={null}
        maxValue={null}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
        minPlaceholder="Min value"
        maxPlaceholder="Max value"
      />
    );

    expect(getByPlaceholderText('Min value')).toBeTruthy();
    expect(getByPlaceholderText('Max value')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <RangeInput
        label="Stars"
        minValue={10}
        maxValue={100}
        onMinChange={mockOnMinChange}
        onMaxChange={mockOnMaxChange}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

