import React from 'react';
import { render } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import FavoritesScreen from 'src/screens/FavoritesScreen/FavoritesScreen';

jest.mock('react-redux');

const mockDispatch = jest.fn();
const mockUseDispatch = useDispatch as unknown as jest.Mock;
const mockUseSelector = useSelector as unknown as jest.Mock;

const mockRepositories = [
  {
    id: 1,
    name: 'favorite-repo',
    full_name: 'algorand/favorite-repo',
    owner: {
      login: 'algorand',
      avatar_url: 'https://test.com/avatar.png',
      html_url: 'https://github.com/algorand',
    },
    html_url: 'https://github.com/algorand/favorite-repo',
    description: 'Favorite repository',
    fork: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
    pushed_at: '2023-01-02T00:00:00Z',
    stargazers_count: 200,
    watchers_count: 100,
    language: 'JavaScript',
    forks_count: 20,
    open_issues_count: 10,
    topics: ['blockchain'],
    visibility: 'public',
    default_branch: 'main',
  },
];

describe('FavoritesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: mockRepositories,
          favorites: [1],
          isLoading: false,
          error: null,
        },
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
    const { getByText } = render(<FavoritesScreen />);
    expect(getByText('favorite-repo')).toBeTruthy();
  });

  it('displays favorite repositories', () => {
    const { getByText } = render(<FavoritesScreen />);
    
    expect(getByText('favorite-repo')).toBeTruthy();
    expect(getByText('algorand')).toBeTruthy();
    expect(getByText('Favorite repository')).toBeTruthy();
  });

  it('shows empty state when no favorites', () => {
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: [],
          favorites: [],
          isLoading: false,
          error: null,
        },
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

    const { getByText } = render(<FavoritesScreen />);
    
    expect(getByText('No favorites yet')).toBeTruthy();
    expect(getByText('Star repositories to see them here')).toBeTruthy();
  });

  it('displays repository statistics', () => {
    const { getByText } = render(<FavoritesScreen />);
    
    expect(getByText('200')).toBeTruthy();
    expect(getByText('JavaScript')).toBeTruthy();
    expect(getByText('20')).toBeTruthy();
  });

  it('renders favorite button as selected for favorite repos', () => {
    const { getByTestId } = render(<FavoritesScreen />);
    const favoriteButton = getByTestId('favorite-button');
    
    expect(favoriteButton).toBeTruthy();
  });

  it('matches snapshot with favorites', () => {
    const { toJSON } = render(<FavoritesScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when empty', () => {
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: [],
          favorites: [],
          isLoading: false,
          error: null,
        },
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

    const { toJSON } = render(<FavoritesScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});

