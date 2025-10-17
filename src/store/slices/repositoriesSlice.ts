import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GitHubRepository } from 'src/types';
import { ORGANIZATIONS, GITHUB_API_ENDPOINTS, API_CONFIG } from 'src/constants';

interface RepositoriesState {
  items: GitHubRepository[];
  favorites: number[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: RepositoriesState = {
  items: [],
  favorites: [],
  isLoading: false,
  error: null,
  lastFetched: null,
};

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (_, { rejectWithValue }) => {
    try {
      const orgs = [
        ORGANIZATIONS.perawallet,
        ORGANIZATIONS.algorandfoundation,
        ORGANIZATIONS.algorand,
      ];

      const promises = orgs.map((org) =>
        fetch(`${GITHUB_API_ENDPOINTS.orgRepos(org)}?per_page=${API_CONFIG.perPage}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch from ${org}`);
            }
            return res.json();
          })
      );

      const results = await Promise.all(promises);
      const allRepos: GitHubRepository[] = results.flat();

      allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

      return allRepos;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch repositories';
      return rejectWithValue(errorMessage);
    }
  }
);

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      
      if (index === -1) {
        state.favorites.push(id);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavorite, clearError } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;

