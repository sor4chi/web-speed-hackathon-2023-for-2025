import { useMutation } from 'urql';

import { SignInMutation } from '../graphql/mutations';

import { useAuthUser } from './useAuthUser';

export const useSignIn = () => {
  const { refetch } = useAuthUser();
  const signIn = useMutation(SignInMutation)[1];

  return {
    signIn: (email: string, password: string) => signIn({ email, password }).then(() => refetch()),
  };
};
