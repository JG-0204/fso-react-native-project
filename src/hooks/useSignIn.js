import { AUTHENTICATE } from '../graphql/mutation';
import { useMutation } from '@apollo/client';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const data = await mutate({
      variables: { credentials: { password, username } },
    });
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
