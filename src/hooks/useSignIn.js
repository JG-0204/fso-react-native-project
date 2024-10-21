import { AUTHENTICATE } from '../graphql/mutation';
import { useMutation, useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { password, username } },
    });

    const token = data.authenticate.accessToken;

    try {
      await authStorage.setAccessToken(token);
      client.resetStore();
    } catch (e) {
      console.log(e);
    }
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
