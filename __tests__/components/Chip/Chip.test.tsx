import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Chip } from 'src/components/Chip/Chip';

describe('Chip', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(
      <Chip label="TypeScript" isSelected={false} onPress={mockOnPress} />
    );
    expect(getByText('TypeScript')).toBeTruthy();
  });

  it('renders as selected', () => {
    const { toJSON } = render(
      <Chip label="JavaScript" isSelected={true} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders as unselected', () => {
    const { toJSON } = render(
      <Chip label="Python" isSelected={false} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByTestId } = render(
      <Chip
        label="Go"
        isSelected={false}
        onPress={mockOnPress}
        testID="chip-go"
      />
    );

    const chip = getByTestId('chip-go');
    fireEvent.press(chip);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot when unselected', () => {
    const { toJSON } = render(
      <Chip label="Rust" isSelected={false} onPress={mockOnPress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when selected', () => {
    const { toJSON } = render(
      <Chip label="Swift" isSelected={true} onPress={mockOnPress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

