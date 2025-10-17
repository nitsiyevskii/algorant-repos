import React from 'react';
import { render } from '@testing-library/react-native';
import { StatTile } from 'src/components/StatTile/StatTile';

describe('StatTile', () => {
  it('renders correctly with all props', () => {
    const { getByText } = render(
      <StatTile
        icon="star"
        value="1.5K"
        label="Stars"
        iconColor="#FF9500"
      />
    );

    expect(getByText('1.5K')).toBeTruthy();
    expect(getByText('Stars')).toBeTruthy();
  });

  it('renders with numeric value', () => {
    const { getByText } = render(
      <StatTile
        icon="git-branch"
        value={100}
        label="Forks"
        iconColor="#8E8E93"
      />
    );

    expect(getByText('100')).toBeTruthy();
    expect(getByText('Forks')).toBeTruthy();
  });

  it('renders with string value', () => {
    const { getByText } = render(
      <StatTile
        icon="eye"
        value="2.3M"
        label="Watchers"
        iconColor="#8E8E93"
      />
    );

    expect(getByText('2.3M')).toBeTruthy();
    expect(getByText('Watchers')).toBeTruthy();
  });

  it('renders icon correctly', () => {
    const { getByTestId } = render(
      <StatTile
        icon="alert-circle"
        value={25}
        label="Issues"
        iconColor="#8E8E93"
      />
    );

    const icon = getByTestId('icon');
    expect(icon.props.name).toBe('alert-circle');
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <StatTile
        icon="star"
        value="1.5K"
        label="Stars"
        iconColor="#FF9500"
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with different icon', () => {
    const { toJSON } = render(
      <StatTile
        icon="git-branch"
        value={518}
        label="Forks"
        iconColor="#8E8E93"
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

