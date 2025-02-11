import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useQuery } from 'urql';

import type { GetProductDetailsQueryResponse } from '../graphql/queries';
import { GetProductDetailsQuery } from '../graphql/queries';

export const useProduct = (productId: number | undefined) => {
  const handleError = useErrorHandler();
  const [productResult, reexecuteQuery] = useQuery<GetProductDetailsQueryResponse>({
    pause: productId == null,
    query: GetProductDetailsQuery,
    variables: {
      productId,
    },
  });

  useEffect(() => {
    if (productResult.error) {
      handleError(productResult.error);
    }
  }, [productResult.error, handleError]);

  const product = productResult.data?.product;

  return { product, refetch: () => reexecuteQuery({ requestPolicy: 'network-only' }) };
};
