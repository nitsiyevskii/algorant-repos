import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { router } from 'expo-router';
import { FilterScreen } from 'src/screens/FilterScreen/FilterScreen';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    push: jest.fn(),
  },
}));

describe('FilterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<FilterScreen />);

    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('Reset')).toBeTruthy();
    expect(getByText('Apply Filters')).toBeTruthy();
  });

  it('renders all filter sections', () => {
    const { getByText } = render(<FilterScreen />);

    expect(getByText('Organization')).toBeTruthy();
    expect(getByText('Language')).toBeTruthy();
    expect(getByText('Stars')).toBeTruthy();
    expect(getByText('Forks')).toBeTruthy();
  });

  it('renders organization options', () => {
    const { getByText } = render(<FilterScreen />);

    expect(getByText('Pera Wallet')).toBeTruthy();
    expect(getByText('Algorand Foundation')).toBeTruthy();
    expect(getByText('Algorand')).toBeTruthy();
  });

  it('renders language options', () => {
    const { getByText } = render(<FilterScreen />);

    expect(getByText('TypeScript')).toBeTruthy();
    expect(getByText('JavaScript')).toBeTruthy();
    expect(getByText('Python')).toBeTruthy();
    expect(getByText('Go')).toBeTruthy();
  });

  it('calls router.back when close button is pressed', () => {
    const { getByTestId } = render(<FilterScreen />);

    const closeButton = getByTestId('icon');
    fireEvent.press(closeButton.parent);

    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('calls router.back when apply button is pressed', () => {
    const { getByText } = render(<FilterScreen />);

    const applyButton = getByText('Apply Filters');
    fireEvent.press(applyButton);

    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('toggles organization selection', () => {
    const { getByTestId } = render(<FilterScreen />);

    const checkbox = getByTestId('checkbox-perawallet');
    fireEvent.press(checkbox);

    expect(checkbox).toBeTruthy();
  });

  it('toggles language selection', () => {
    const { getByTestId } = render(<FilterScreen />);

    const chip = getByTestId('chip-TypeScript');
    fireEvent.press(chip);

    expect(chip).toBeTruthy();
  });

  it('resets filters when reset button is pressed', () => {
    const { getByText, getByTestId } = render(<FilterScreen />);

    const checkbox = getByTestId('checkbox-perawallet');
    fireEvent.press(checkbox);

    const resetButton = getByText('Reset');
    fireEvent.press(resetButton);

    expect(resetButton).toBeTruthy();
  });

  it('updates star range min value', () => {
    const { getByTestId } = render(<FilterScreen />);

    const minInput = getByTestId('range-input-min-stars');
    fireEvent.changeText(minInput, '100');

    expect(minInput.props.value).toBe('100');
  });

  it('updates star range max value', () => {
    const { getByTestId } = render(<FilterScreen />);

    const maxInput = getByTestId('range-input-max-stars');
    fireEvent.changeText(maxInput, '500');

    expect(maxInput.props.value).toBe('500');
  });

  it('updates fork range min value', () => {
    const { getByTestId } = render(<FilterScreen />);

    const minInput = getByTestId('range-input-min-forks');
    fireEvent.changeText(minInput, '10');

    expect(minInput.props.value).toBe('10');
  });

  it('updates fork range max value', () => {
    const { getByTestId } = render(<FilterScreen />);

    const maxInput = getByTestId('range-input-max-forks');
    fireEvent.changeText(maxInput, '50');

    expect(maxInput.props.value).toBe('50');
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<FilterScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});

