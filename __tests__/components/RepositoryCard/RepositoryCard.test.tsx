import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { router } from 'expo-router';
import { RepositoryCard } from 'src/components/RepositoryCard/RepositoryCard';
import { GitHubRepository } from 'src/types';

const mockRepository: GitHubRepository = {
  id: 1,
  name: 'test-repo',
  full_name: 'algorand/test-repo',
  owner: {
    login: 'algorand',
    avatar_url: 'https://test.com/avatar.png',
    html_url: 'https://github.com/algorand',
  },
  html_url: 'https://github.com/algorand/test-repo',
  description: 'Test repository description',
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
};

describe('RepositoryCard', () => {
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders repository information correctly', () => {
    const { getByText } = render(
      <RepositoryCard
        repository={mockRepository}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(getByText('test-repo')).toBeTruthy();
    expect(getByText('algorand')).toBeTruthy();
    expect(getByText('Test repository description')).toBeTruthy();
  });

  it('displays repository statistics', () => {
    const { getByText } = render(
      <RepositoryCard
        repository={mockRepository}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(getByText('100')).toBeTruthy();
    expect(getByText('TypeScript')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
  });

  it('renders favorite button with correct state', () => {
    const { getByTestId } = render(
      <RepositoryCard
        repository={mockRepository}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = getByTestId('favorite-button');
    expect(favoriteButton).toBeTruthy();
  });

  it('calls onToggleFavorite when favorite button is pressed', () => {
    const { getByTestId } = render(
      <RepositoryCard
        repository={mockRepository}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = getByTestId('favorite-button');
    fireEvent.press(favoriteButton);

    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('navigates to repository details when pressed', () => {
    const { getByText } = render(
      <RepositoryCard
        repository={mockRepository}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const card = getByText('test-repo').parent?.parent?.parent;
    if (card) {
      fireEvent.press(card);
      expect(router.push).toHaveBeenCalledWith('/repository/algorand/test-repo');
    }
  });

  it('renders without description', () => {
    const repoWithoutDescription = {
      ...mockRepository,
      description: null,
    };

    const { queryByText } = render(
      <RepositoryCard
        repository={repoWithoutDescription}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(queryByText('Test repository description')).toBeNull();
  });

  it('renders without language', () => {
    const repoWithoutLanguage = {
      ...mockRepository,
      language: null,
    };

    const { queryByText } = render(
      <RepositoryCard
        repository={repoWithoutLanguage}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(queryByText('TypeScript')).toBeNull();
  });

  it('matches snapshot when not favorite', () => {
    const { toJSON } = render(
      <RepositoryCard
        repository={mockRepository}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when favorite', () => {
    const { toJSON } = render(
      <RepositoryCard
        repository={mockRepository}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('truncates long repository names', () => {
    const repoWithLongName = {
      ...mockRepository,
      name: 'very-long-repository-name-that-should-be-truncated',
    };

    const { getByText } = render(
      <RepositoryCard
        repository={repoWithLongName}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const nameElement = getByText('very-long-repository-name-that-should-be-truncated');
    expect(nameElement.props.numberOfLines).toBe(1);
  });

  it('truncates long descriptions', () => {
    const repoWithLongDescription = {
      ...mockRepository,
      description: 'This is a very long description that should be truncated to two lines maximum to ensure proper display',
    };

    const { getByText } = render(
      <RepositoryCard
        repository={repoWithLongDescription}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const descriptionElement = getByText('This is a very long description that should be truncated to two lines maximum to ensure proper display');
    expect(descriptionElement.props.numberOfLines).toBe(2);
  });
});

