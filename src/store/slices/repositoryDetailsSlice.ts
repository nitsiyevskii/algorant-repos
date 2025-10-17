import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GitHubRepository } from 'src/types';
import { GITHUB_API_ENDPOINTS } from 'src/constants';

interface RepositoryDetailsState {
  repository: GitHubRepository | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RepositoryDetailsState = {
  repository: null,
  isLoading: false,
  error: null,
};

export const fetchRepositoryDetails = createAsyncThunk(
  'repositoryDetails/fetchRepositoryDetails',
  async (fullName: string, { rejectWithValue }) => {
    try {
      const [owner, repo] = fullName.split('/');
      const response = await fetch(GITHUB_API_ENDPOINTS.repo(owner, repo));

      if (!response.ok) {
        throw new Error('Failed to fetch repository details');
      }

      const data = await response.json();
      return data as GitHubRepository;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch repository details';
      return rejectWithValue(errorMessage);
    }
  }
);

const repositoryDetailsSlice = createSlice({
  name: 'repositoryDetails',
  initialState,
  reducers: {
    clearRepositoryDetails: (state) => {
      state.repository = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoryDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRepositoryDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.repository = action.payload;
      })
      .addCase(fetchRepositoryDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRepositoryDetails } = repositoryDetailsSlice.actions;
export default repositoryDetailsSlice.reducer;

