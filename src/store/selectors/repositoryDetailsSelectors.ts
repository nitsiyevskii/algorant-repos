import type { RootState } from 'src/store';

export const selectRepositoryDetails = (state: RootState) => state.repositoryDetails.repository;
export const selectRepositoryDetailsLoading = (state: RootState) => state.repositoryDetails.isLoading;
export const selectRepositoryDetailsError = (state: RootState) => state.repositoryDetails.error;

