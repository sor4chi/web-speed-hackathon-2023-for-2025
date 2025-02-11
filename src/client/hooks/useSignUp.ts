import { useMutation } from 'urql';

import { SignUpMutation } from '../graphql/mutations';

import { useAuthUser } from './useAuthUser';

export const useSignUp = () => {
  const { refetch } = useAuthUser();
  const signUp = useMutation(SignUpMutation)[1];

  return {
    signUp: (name: string, email: string, password: string) => signUp({ email, name, password }).then(() => refetch()),
  };
};
