import { gql } from '@apollo/client';

const REPOSITORY_DATA = gql`
  fragment RepositoryData on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_DATA}
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      url
      ...RepositoryData
    }
  }
`;

export const ALL_REPOSITORIES = gql`
  ${REPOSITORY_DATA}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryData
        }
      }
    }
  }
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      reviews @include(if: $includeReviews) {
        edges {
          node {
            rating
            text
            createdAt
            repository {
              fullName
              id
            }
            id
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
