import { render } from '@testing-library/react-native';
import { EmptyState } from 'src/components/EmptyState/EmptyState';

describe('EmptyState', () => {
  it('renders correctly with message', () => {
    const { getByText } = render(
      <EmptyState message="No data available" />
    );
    
    expect(getByText('No data available')).toBeTruthy();
  });

  it('renders with custom icon', () => {
    const { getByText } = render(
      <EmptyState icon="folder-open" message="Empty folder" />
    );
    
    expect(getByText('Empty folder')).toBeTruthy();
  });

  it('renders with description', () => {
    const { getByText } = render(
      <EmptyState
        message="No results"
        description="Try adjusting your search"
      />
    );
    
    expect(getByText('No results')).toBeTruthy();
    expect(getByText('Try adjusting your search')).toBeTruthy();
  });

  it('renders without description when not provided', () => {
    const { getByText, queryByText } = render(
      <EmptyState message="No data" />
    );
    
    expect(getByText('No data')).toBeTruthy();
    expect(queryByText('Try adjusting your search')).toBeNull();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <EmptyState
        icon="search"
        message="No repositories found"
        description="Try adjusting your search"
      />
    );
    
    expect(toJSON()).toMatchSnapshot();
  });
});

