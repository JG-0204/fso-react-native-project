import { useQuery } from '@apollo/client';
import { GET_REPOSITORY, GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const useRepository = (variables) => {
  const repoQuery = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: variables.repositoryId,
    },
  });

  const repoReviewQuery = useQuery(GET_REPOSITORY_REVIEWS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const reviews = repoReviewQuery?.data?.repository?.reviews?.edges.map(
    (edge) => edge.node
  );
  const repository = repoQuery?.data?.repository;

  const handleFetchMore = () => {
    const canFetchMore =
      !repoReviewQuery.loading &&
      repoReviewQuery.data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    repoReviewQuery.fetchMore({
      variables: {
        after: repoReviewQuery.data?.repository?.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository,
    reviews,
    fetchMore: handleFetchMore,
    loading: repoQuery.loading && repoReviewQuery.loading,
  };
};

export default useRepository;
