import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'urql';

import { UpdateItemInShoppingCartMutation, type UpdateItemInShoppingCartMutationResponse } from '../graphql/mutations';

import { useAuthUser } from './useAuthUser';

export const useUpdateCartItem = () => {
  const handleError = useErrorHandler();
  const { refetch } = useAuthUser();
  const [res, updateCartItem] = useMutation<UpdateItemInShoppingCartMutationResponse>(UpdateItemInShoppingCartMutation);

  useEffect(() => {
    if (res.error) {
      handleError(res.error);
    }
  }, [res.error, handleError]);

  return {
    updateCartItem: (amount: number, productId: number) => updateCartItem({ amount, productId }).then(() => refetch()),
  };
};
