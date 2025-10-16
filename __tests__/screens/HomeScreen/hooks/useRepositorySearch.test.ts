import { renderHook, act } from '@testing-library/react-native';
import { useRepositorySearch } from 'src/screens/HomeScreen/hooks/useRepositorySearch';
import { GitHubRepository } from 'src/types';

const mockRepositories: GitHubRepository[] = [
  {
    id: 1,
    name: 'algorand-sdk',
    full_name: 'algorand/algorand-sdk',
    owner: {
      login: 'algorand',
      avatar_url: 'https://test.com/avatar.png',
      html_url: 'https://github.com/algorand',
    },
    html_url: 'https://github.com/algorand/algorand-sdk',
    description: 'SDK for Algorand blockchain',
    fork: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
    pushed_at: '2023-01-02T00:00:00Z',
    stargazers_count: 100,
    watchers_count: 50,
    language: 'TypeScript',
    forks_count: 10,
    open_issues_count: 5,
    topics: ['blockchain'],
    visibility: 'public',
    default_branch: 'main',
  },
  {
    id: 2,
    name: 'pera-wallet',
    full_name: 'perawallet/pera-wallet',
    owner: {
      login: 'perawallet',
      avatar_url: 'https://test.com/avatar.png',
      html_url: 'https://github.com/perawallet',
    },
    html_url: 'https://github.com/perawallet/pera-wallet',
    description: 'Pera Wallet mobile app',
    fork: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
    pushed_at: '2023-01-02T00:00:00Z',
    stargazers_count: 200,
    watchers_count: 100,
    language: 'JavaScript',
    forks_count: 20,
    open_issues_count: 10,
    topics: ['wallet'],
    visibility: 'public',
    default_branch: 'main',
  },
];

describe('useRepositorySearch', () => {
  it('returns all repositories when search is empty', () => {
    const { result } = renderHook(() => useRepositorySearch(mockRepositories));

    expect(result.current.filteredRepositories).toEqual(mockRepositories);
    expect(result.current.hasResults).toBe(true);
  });

  it('filters repositories by name', () => {
    const { result } = renderHook(() => useRepositorySearch(mockRepositories));

    act(() => {
      result.current.setSearchQuery('algorand');
    });

    expect(result.current.filteredRepositories).toHaveLength(1);
    expect(result.current.filteredRepositories[0].name).toBe('algorand-sdk');
  });

  it('filters repositories by description', () => {
    const { result } = renderHook(() => useRepositorySearch(mockRepositories));

    act(() => {
      result.current.setSearchQuery('SDK');
    });

    expect(result.current.filteredRepositories).toHaveLength(1);
    expect(result.current.filteredRepositories[0].description).toContain('SDK');
  });

  it('filters repositories by owner', () => {
    const { result } = renderHook(() => useRepositorySearch(mockRepositories));

    act(() => {
      result.current.setSearchQuery('perawallet');
    });

    expect(result.current.filteredRepositories).toHaveLength(1);
    expect(result.current.filteredRepositories[0].owner.login).toBe('perawallet');
  });

  it('is case insensitive', () => {
    const { result } = renderHook(() => useRepositorySearch(mockRepositories));

    act(() => {
      result.current.setSearchQuery('ALGORAND');
    });

    expect(result.current.filteredRepositories).toHaveLength(1);
  });

  it('clears search', () => {
    const { result } = renderHook(() => useRepositorySearch(mockRepositories));

    act(() => {
      result.current.setSearchQuery('test');
    });

    expect(result.current.searchQuery).toBe('test');

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredRepositories).toEqual(mockRepositories);
  });

  it('returns empty array when no matches', () => {
    const { result } = renderHook(() => useRepositorySearch(mockRepositories));

    act(() => {
      result.current.setSearchQuery('nonexistent');
    });

    expect(result.current.filteredRepositories).toHaveLength(0);
    expect(result.current.hasResults).toBe(false);
  });
});

