import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';

jest.mock('react-redux');

const mockDispatch = jest.fn();
const mockUseDispatch = useDispatch as unknown as jest.Mock;
const mockUseSelector = useSelector as unknown as jest.Mock;

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
    mockUseDispatch.mockReturnValue(mockDispatch);
    
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: mockRepositories,
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
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    expect(getByPlaceholderText('Search repositories...')).toBeTruthy();
  });

  it('shows loading spinner when loading', () => {
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: [],
          favorites: [],
          isLoading: true,
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

    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('shows error state when error occurs', () => {
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: [],
          favorites: [],
          isLoading: false,
          error: 'Failed to fetch',
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

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Failed to load repositories')).toBeTruthy();
    expect(getByText('Failed to fetch')).toBeTruthy();
  });

  it('shows empty state when no repositories', () => {
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

  it('dispatches fetchRepositories on mount', () => {
    render(<HomeScreen />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when loading', () => {
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: [],
          favorites: [],
          isLoading: true,
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

    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when error', () => {
    mockUseSelector.mockImplementation((selector) => {
      const state = {
        repositories: {
          items: [],
          favorites: [],
          isLoading: false,
          error: 'Test error',
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

    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
