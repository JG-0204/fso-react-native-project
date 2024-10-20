import { useQuery } from '@apollo/client';

import { ALL_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(ALL_REPOSITORIES);

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
