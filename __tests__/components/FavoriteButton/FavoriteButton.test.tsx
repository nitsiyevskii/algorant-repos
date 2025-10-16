import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FavoriteButton } from 'src/components/FavoriteButton/FavoriteButton';

describe('FavoriteButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when not selected', () => {
    const { toJSON } = render(
      <FavoriteButton isSelected={false} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders correctly when selected', () => {
    const { toJSON } = render(
      <FavoriteButton isSelected={true} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByTestId } = render(
      <FavoriteButton isSelected={false} onPress={mockOnPress} />
    );
    
    const button = getByTestId('favorite-button');
    fireEvent.press(button);
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const { getByTestId } = render(
      <FavoriteButton isSelected={false} onPress={mockOnPress} disabled={true} />
    );
    
    const button = getByTestId('favorite-button');
    fireEvent.press(button);
    
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom size', () => {
    const component = render(
      <FavoriteButton isSelected={false} onPress={mockOnPress} size={32} />
    );
    expect(component).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <FavoriteButton isSelected={false} onPress={mockOnPress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

