import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';

// Mock the hooks
jest.mock('src/screens/HomeScreen/hooks/useRepositories', () => ({
  useRepositories: jest.fn(),
}));

jest.mock('src/screens/HomeScreen/hooks/useRepositorySearch', () => ({
  useRepositorySearch: jest.fn(),
}));

jest.mock('src/screens/HomeScreen/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));

// Mock navigation
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

import { useRepositories } from 'src/screens/HomeScreen/hooks/useRepositories';
import { useRepositorySearch } from 'src/screens/HomeScreen/hooks/useRepositorySearch';
import { useFavorites } from 'src/screens/HomeScreen/hooks/useFavorites';

const mockRepositories = [
  {
    id: 1,
    name: 'test-repo',
    full_name: 'algorand/test-repo',
    owner: {
      login: 'algorand',
      avatar_url: 'https://test.com/avatar.png',
      html_url: 'https://github.com/algorand',
    },
    html_url: 'https://github.com/algorand/test-repo',
    description: 'Test repository',
    fork: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
    pushed_at: '2023-01-02T00:00:00Z',
    stargazers_count: 100,
    watchers_count: 50,
    language: 'TypeScript',
    forks_count: 10,
    open_issues_count: 5,
    topics: ['blockchain', 'algorand'],
    visibility: 'public',
    default_branch: 'main',
  },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: mockRepositories,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useRepositorySearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      clearSearch: jest.fn(),
      filteredRepositories: mockRepositories,
      hasResults: true,
    });

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: new Set(),
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(() => false),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      clearFavorites: jest.fn(),
      favoriteCount: 0,
    });
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    expect(getByPlaceholderText('Search repositories...')).toBeTruthy();
  });

  it('shows loading spinner when loading', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId).toBeTruthy();
  });

  it('shows error state when error occurs', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      isLoading: false,
      error: 'Failed to fetch',
      refetch: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Failed to load repositories')).toBeTruthy();
    expect(getByText('Failed to fetch')).toBeTruthy();
  });

  it('shows empty state when no repositories', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useRepositorySearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      clearSearch: jest.fn(),
      filteredRepositories: [],
      hasResults: false,
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('No repositories available')).toBeTruthy();
  });

  it('renders repository list', async () => {
    const { getByText } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(getByText('test-repo')).toBeTruthy();
      expect(getByText('algorand')).toBeTruthy();
    });
  });

  it('renders search input', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    expect(getByPlaceholderText('Search repositories...')).toBeTruthy();
  });

  it('renders filter button', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Filter')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when loading', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when error', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      isLoading: false,
      error: 'Test error',
      refetch: jest.fn(),
    });

    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});

