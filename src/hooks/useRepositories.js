import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { ALL_REPOSITORIES } from '../graphql/queries';

const useRepositories = (filterBy, searchQuery, variables) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    ALL_REPOSITORIES,
    {
      variables,
    }
  );

  useEffect(() => {
    refetch(filterBy);
    refetch({ searchKeyword: searchQuery });
  }, [filterBy, searchQuery]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  let repositories;

  if (data) {
    repositories = data.repositories.edges.map((edge) => edge.node);
  }

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
