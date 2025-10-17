import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CheckboxItem } from 'src/components/CheckboxItem/CheckboxItem';

describe('CheckboxItem', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(
      <CheckboxItem label="Option 1" isSelected={false} onPress={mockOnPress} />
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('renders as selected', () => {
    const { toJSON } = render(
      <CheckboxItem label="Option 2" isSelected={true} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders as unselected', () => {
    const { toJSON } = render(
      <CheckboxItem label="Option 3" isSelected={false} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByTestId } = render(
      <CheckboxItem
        label="Option 4"
        isSelected={false}
        onPress={mockOnPress}
        testID="checkbox-option4"
      />
    );

    const checkbox = getByTestId('checkbox-option4');
    fireEvent.press(checkbox);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot when unselected', () => {
    const { toJSON } = render(
      <CheckboxItem label="Algorand" isSelected={false} onPress={mockOnPress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when selected', () => {
    const { toJSON } = render(
      <CheckboxItem label="Pera Wallet" isSelected={true} onPress={mockOnPress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

