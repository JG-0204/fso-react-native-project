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

export const ALL_REPOSITORIES = gql`
  ${REPOSITORY_DATA}
  query Repositories {
    repositories {
      edges {
        node {
          ...RepositoryData
        }
      }
    }
  }
`;
