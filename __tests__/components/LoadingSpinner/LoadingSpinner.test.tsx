import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(<LoadingSpinner />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with small size', () => {
    const { getByTestId } = render(<LoadingSpinner size="small" />);
    const spinner = getByTestId('activity-indicator');
    expect(spinner.props.size).toBe('small');
  });

  it('renders with large size', () => {
    const { getByTestId } = render(<LoadingSpinner size="large" />);
    const spinner = getByTestId('activity-indicator');
    expect(spinner.props.size).toBe('large');
  });

  it('renders with custom color', () => {
    const { getByTestId } = render(<LoadingSpinner color="#FF0000" />);
    const spinner = getByTestId('activity-indicator');
    expect(spinner.props.color).toBe('#FF0000');
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<LoadingSpinner />);
    expect(toJSON()).toMatchSnapshot();
  });
});

