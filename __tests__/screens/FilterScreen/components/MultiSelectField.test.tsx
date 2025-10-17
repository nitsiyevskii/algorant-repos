import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MultiSelectField } from 'src/screens/FilterScreen/components/MultiSelectField/MultiSelectField';

describe('MultiSelectField', () => {
  const mockOnToggle = jest.fn();
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Checkbox type', () => {
    it('renders correctly with label', () => {
      const { getByText } = render(
        <MultiSelectField
          label="Organizations"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="checkbox"
        />
      );

      expect(getByText('Organizations')).toBeTruthy();
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
      expect(getByText('Option 3')).toBeTruthy();
    });

    it('renders all options', () => {
      const { getByText } = render(
        <MultiSelectField
          label="Test"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="checkbox"
        />
      );

      options.forEach((option) => {
        expect(getByText(option.label)).toBeTruthy();
      });
    });

    it('calls onToggle when checkbox is pressed', () => {
      const { getByTestId } = render(
        <MultiSelectField
          label="Test"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="checkbox"
        />
      );

      const checkbox = getByTestId('checkbox-option1');
      fireEvent.press(checkbox);

      expect(mockOnToggle).toHaveBeenCalledWith('option1');
    });

    it('renders selected checkboxes correctly', () => {
      const { toJSON } = render(
        <MultiSelectField
          label="Test"
          options={options}
          selectedValues={['option1', 'option3']}
          onToggle={mockOnToggle}
          type="checkbox"
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('matches snapshot with no selection', () => {
      const { toJSON } = render(
        <MultiSelectField
          label="Organizations"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="checkbox"
        />
      );

      expect(toJSON()).toMatchSnapshot();
    });

    it('matches snapshot with selections', () => {
      const { toJSON } = render(
        <MultiSelectField
          label="Organizations"
          options={options}
          selectedValues={['option1', 'option2']}
          onToggle={mockOnToggle}
          type="checkbox"
        />
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('Chip type', () => {
    it('renders correctly with label', () => {
      const { getByText } = render(
        <MultiSelectField
          label="Languages"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="chip"
        />
      );

      expect(getByText('Languages')).toBeTruthy();
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
      expect(getByText('Option 3')).toBeTruthy();
    });

    it('renders all options', () => {
      const { getByText } = render(
        <MultiSelectField
          label="Test"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="chip"
        />
      );

      options.forEach((option) => {
        expect(getByText(option.label)).toBeTruthy();
      });
    });

    it('calls onToggle when chip is pressed', () => {
      const { getByTestId } = render(
        <MultiSelectField
          label="Test"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="chip"
        />
      );

      const chip = getByTestId('chip-option2');
      fireEvent.press(chip);

      expect(mockOnToggle).toHaveBeenCalledWith('option2');
    });

    it('renders selected chips correctly', () => {
      const { toJSON } = render(
        <MultiSelectField
          label="Test"
          options={options}
          selectedValues={['option2']}
          onToggle={mockOnToggle}
          type="chip"
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('matches snapshot with no selection', () => {
      const { toJSON } = render(
        <MultiSelectField
          label="Languages"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
          type="chip"
        />
      );

      expect(toJSON()).toMatchSnapshot();
    });

    it('matches snapshot with selections', () => {
      const { toJSON } = render(
        <MultiSelectField
          label="Languages"
          options={options}
          selectedValues={['option1', 'option3']}
          onToggle={mockOnToggle}
          type="chip"
        />
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('Default type', () => {
    it('defaults to checkbox type when type is not specified', () => {
      const { getByTestId } = render(
        <MultiSelectField
          label="Test"
          options={options}
          selectedValues={[]}
          onToggle={mockOnToggle}
        />
      );

      const checkbox = getByTestId('checkbox-option1');
      expect(checkbox).toBeTruthy();
    });
  });
});

