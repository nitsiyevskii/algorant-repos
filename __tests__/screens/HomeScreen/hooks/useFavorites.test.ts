import { renderHook, act } from '@testing-library/react-native';
import { useFavorites } from 'src/screens/HomeScreen/hooks/useFavorites';

describe('useFavorites', () => {
  it('initializes with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favoriteCount).toBe(0);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('adds a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.favoriteCount).toBe(1);
  });

  it('removes a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);

    act(() => {
      result.current.removeFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(false);
    expect(result.current.favoriteCount).toBe(0);
  });

  it('toggles a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);

    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('handles multiple favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(1);
      result.current.addFavorite(2);
      result.current.addFavorite(3);
    });

    expect(result.current.favoriteCount).toBe(3);
    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(true);
    expect(result.current.isFavorite(3)).toBe(true);
  });

  it('clears all favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(1);
      result.current.addFavorite(2);
      result.current.addFavorite(3);
    });

    expect(result.current.favoriteCount).toBe(3);

    act(() => {
      result.current.clearFavorites();
    });

    expect(result.current.favoriteCount).toBe(0);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('does not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(1);
      result.current.addFavorite(1);
    });

    expect(result.current.favoriteCount).toBe(1);
  });
});

