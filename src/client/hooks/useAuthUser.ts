import { useQuery } from 'urql';

import type { GetUserAuthQueryResponse } from '../graphql/queries';
import { GetAuthUserQuery } from '../graphql/queries';

export const useAuthUser = () => {
  const [authUserResult, reexecuteQuery] = useQuery<GetUserAuthQueryResponse>({ query: GetAuthUserQuery });
  const authUser = authUserResult.data?.me;
  const authUserLoading = authUserResult.fetching;
  const isAuthUser = !!authUser;

  return {
    authUser,
    authUserLoading,
    isAuthUser,
    refetch: () => reexecuteQuery({ requestPolicy: 'network-only' }),
  };
};
