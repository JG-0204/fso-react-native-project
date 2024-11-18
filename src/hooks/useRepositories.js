import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { ALL_REPOSITORIES } from '../graphql/queries';

const useRepositories = (filterBy) => {
  const { data, loading, error, refetch } = useQuery(ALL_REPOSITORIES);

  useEffect(() => {
    refetch(filterBy);
  }, [filterBy]);

  let repositories;

  if (data) {
    repositories = data.repositories.edges.map((edge) => edge.node);
  }

  return {
    repositories,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
