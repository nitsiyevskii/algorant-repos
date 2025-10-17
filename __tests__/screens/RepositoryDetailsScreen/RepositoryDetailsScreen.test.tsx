import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import RepositoryDetailsScreen from 'src/screens/RepositoryDetailsScreen/RepositoryDetailsScreen';

jest.mock('react-redux');
jest.mock('expo-router');

const mockDispatch = jest.fn();
const mockUseDispatch = useDispatch as unknown as jest.Mock;
const mockUseSelector = useSelector as unknown as jest.Mock;
const mockUseLocalSearchParams = useLocalSearchParams as jest.Mock;

const mockRepositoryData = {
  id: 1,
  name: 'test-repo',
  full_name: 'algorand/test-repo',
  owner: {
    login: 'algorand',
    avatar_url: 'https://test.com/avatar.png',
    html_url: 'https://github.com/algorand',
  },
  html_url: 'https://github.com/algorand/test-repo',
  homepage: 'https://example.com',
  description: 'Test repository description',
  fork: false,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-12-01T00:00:00Z',
  pushed_at: '2023-12-01T00:00:00Z',
  stargazers_count: 1500,
  watchers_count: 500,
  language: 'TypeScript',
  forks_count: 150,
  open_issues_count: 25,
  topics: ['blockchain', 'algorand', 'web3'],
  visibility: 'public',
  default_branch: 'main',
  size: 2048,
  license: {
    key: 'mit',
    name: 'MIT License',
    spdx_id: 'MIT',
    url: 'https://api.github.com/licenses/mit',
    node_id: 'MDc6TGljZW5zZTEz',
  },
};

describe('RepositoryDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    
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
        repositoryDetails: {
          repository: mockRepositoryData,
          isLoading: false,
          error: null,
        },
      };
      return selector(state);
    });

    mockUseLocalSearchParams.mockReturnValue({
      repository: 'algorand/test-repo',
    });
  });

  it('dispatches fetchRepositoryDetails on mount', () => {
    render(<RepositoryDetailsScreen />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('displays repository details', () => {
    const { getByText } = render(<RepositoryDetailsScreen />);

    expect(getByText('test-repo')).toBeTruthy();
    expect(getByText('algorand')).toBeTruthy();
    expect(getByText('Test repository description')).toBeTruthy();
  });

  it('displays repository statistics', () => {
    const { getByText } = render(<RepositoryDetailsScreen />);

    expect(getByText('1.5K')).toBeTruthy();
    expect(getByText('Stars')).toBeTruthy();
    expect(getByText('Forks')).toBeTruthy();
    expect(getByText('Watchers')).toBeTruthy();
    expect(getByText('Issues')).toBeTruthy();
  });

  it('displays repository about information', () => {
    const { getByText } = render(<RepositoryDetailsScreen />);

    expect(getByText('About')).toBeTruthy();
    expect(getByText('TypeScript')).toBeTruthy();
    expect(getByText('MIT License')).toBeTruthy();
    expect(getByText('main')).toBeTruthy();
  });

  it('displays repository topics with count', () => {
    const { getByText } = render(<RepositoryDetailsScreen />);

    expect(getByText('Topics (3)')).toBeTruthy();
    expect(getByText('blockchain')).toBeTruthy();
    expect(getByText('algorand')).toBeTruthy();
    expect(getByText('web3')).toBeTruthy();
  });

  it('displays repository links', () => {
    const { getByText } = render(<RepositoryDetailsScreen />);

    expect(getByText('Links')).toBeTruthy();
    expect(getByText('View on GitHub')).toBeTruthy();
    expect(getByText('Homepage')).toBeTruthy();
  });

  it('shows loading spinner when loading', () => {
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
        repositoryDetails: {
          repository: null,
          isLoading: true,
          error: null,
        },
      };
      return selector(state);
    });

    const { getByTestId } = render(<RepositoryDetailsScreen />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('shows error state when fetch fails', () => {
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
        repositoryDetails: {
          repository: null,
          isLoading: false,
          error: 'Network error',
        },
      };
      return selector(state);
    });

    const { getByText } = render(<RepositoryDetailsScreen />);
    expect(getByText('Failed to load repository')).toBeTruthy();
  });

  it('renders favorite button in header', () => {
    const { getByTestId } = render(<RepositoryDetailsScreen />);
    expect(getByTestId('favorite-button')).toBeTruthy();
  });

  it('displays back button with text', () => {
    const { getByText } = render(<RepositoryDetailsScreen />);
    expect(getByText('Back')).toBeTruthy();
  });

  it('displays fork badge for forked repositories', () => {
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
        repositoryDetails: {
          repository: { ...mockRepositoryData, fork: true },
          isLoading: false,
          error: null,
        },
      };
      return selector(state);
    });

    const { getByText } = render(<RepositoryDetailsScreen />);
    expect(getByText('Fork')).toBeTruthy();
  });

  it('displays private badge for private repositories', () => {
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
        repositoryDetails: {
          repository: { ...mockRepositoryData, visibility: 'private' },
          isLoading: false,
          error: null,
        },
      };
      return selector(state);
    });

    const { getByText } = render(<RepositoryDetailsScreen />);
    expect(getByText('Private')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<RepositoryDetailsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
