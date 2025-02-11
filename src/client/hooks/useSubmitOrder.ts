import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'urql';

import type { OrderItemsInShoppingCartMutationResponse } from '../graphql/mutations';
import { OrderItemsInShoppingCartMutation } from '../graphql/mutations';

import { useAuthUser } from './useAuthUser';

export const useSubmitOrder = () => {
  const handleError = useErrorHandler();
  const { refetch } = useAuthUser();
  const [res, submitOrder] = useMutation<OrderItemsInShoppingCartMutationResponse>(OrderItemsInShoppingCartMutation);

  useEffect(() => {
    if (res.error) {
      handleError(res.error);
    }
  }, [res.error, handleError]);

  return {
    submitOrder: (address: string, zipCode: string) => submitOrder({ address, zipCode }).then(() => refetch()),
  };
};
