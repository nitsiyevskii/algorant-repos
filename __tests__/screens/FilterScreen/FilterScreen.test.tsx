import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { FilterScreen } from 'src/screens/FilterScreen/FilterScreen';

jest.mock('react-redux');

const mockDispatch = jest.fn();
const mockUseDispatch = useDispatch as unknown as jest.Mock;
const mockUseSelector = useSelector as unknown as jest.Mock;

describe('FilterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        filters: {
          organizations: [],
          languages: [],
          stars: { min: null, max: null },
          forks: { min: null, max: null },
          searchQuery: '',
        },
      };
      return selector(state);
    });
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

  it('dispatches toggleOrganization when organization is toggled', () => {
    const { getByTestId } = render(<FilterScreen />);

    const checkbox = getByTestId('checkbox-perawallet');
    fireEvent.press(checkbox);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches toggleLanguage when language is toggled', () => {
    const { getByTestId } = render(<FilterScreen />);

    const chip = getByTestId('chip-TypeScript');
    fireEvent.press(chip);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches resetFilters when reset button is pressed', () => {
    const { getByText } = render(<FilterScreen />);

    const resetButton = getByText('Reset');
    fireEvent.press(resetButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches setStarMin when star min input changes', () => {
    const { getByTestId } = render(<FilterScreen />);

    const minInput = getByTestId('range-input-min-stars');
    fireEvent.changeText(minInput, '100');

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches setStarMax when star max input changes', () => {
    const { getByTestId } = render(<FilterScreen />);

    const maxInput = getByTestId('range-input-max-stars');
    fireEvent.changeText(maxInput, '500');

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches setForkMin when fork min input changes', () => {
    const { getByTestId } = render(<FilterScreen />);

    const minInput = getByTestId('range-input-min-forks');
    fireEvent.changeText(minInput, '10');

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches setForkMax when fork max input changes', () => {
    const { getByTestId } = render(<FilterScreen />);

    const maxInput = getByTestId('range-input-max-forks');
    fireEvent.changeText(maxInput, '50');

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('displays selected filters from Redux state', () => {
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        filters: {
          organizations: ['perawallet'],
          languages: ['TypeScript', 'JavaScript'],
          stars: { min: 100, max: 500 },
          forks: { min: 10, max: 50 },
          searchQuery: '',
        },
      };
      return selector(state);
    });

    const { getByDisplayValue } = render(<FilterScreen />);

    expect(getByDisplayValue('100')).toBeTruthy();
    expect(getByDisplayValue('500')).toBeTruthy();
    expect(getByDisplayValue('10')).toBeTruthy();
    expect(getByDisplayValue('50')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<FilterScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
