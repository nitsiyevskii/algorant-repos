import { renderHook, waitFor } from '@testing-library/react-native';
import { useRepositories } from 'src/screens/HomeScreen/hooks/useRepositories';

global.fetch = jest.fn();

const mockRepos = [
  {
    id: 1,
    name: 'repo1',
    stargazers_count: 100,
  },
  {
    id: 2,
    name: 'repo2',
    stargazers_count: 200,
  },
];

describe('useRepositories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches repositories successfully', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockRepos,
    });

    const { result } = renderHook(() => useRepositories());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.repositories.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch error', async () => {
    // Suppress expected error log
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useRepositories());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.repositories).toEqual([]);
    
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('sorts repositories by stars descending', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockRepos,
    });

    const { result } = renderHook(() => useRepositories());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const repos = result.current.repositories;
    if (repos.length > 1) {
      expect(repos[0].stargazers_count).toBeGreaterThanOrEqual(
        repos[1].stargazers_count
      );
    }
  });

  it('provides refetch function', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockRepos,
    });

    const { result } = renderHook(() => useRepositories());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.refetch).toBeDefined();
    expect(typeof result.current.refetch).toBe('function');
  });
});

