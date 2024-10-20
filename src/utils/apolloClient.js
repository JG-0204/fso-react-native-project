import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://hardy-firefly-actual.ngrok-free.app/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
