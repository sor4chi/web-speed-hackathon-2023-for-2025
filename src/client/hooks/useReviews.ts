import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useQuery } from 'urql';

import type { GetProductReviewsQueryResponse } from '../graphql/queries';
import { GetProductReviewsQuery } from '../graphql/queries';

export const useReviews = (productId: number | undefined) => {
  const handleError = useErrorHandler();
  const [reviewResult, reexecuteQuery] = useQuery<GetProductReviewsQueryResponse>({
    pause: !productId,
    query: GetProductReviewsQuery,
    variables: {
      productId,
    },
  });

  useEffect(() => {
    if (reviewResult.error) {
      handleError(reviewResult.error);
    }
  }, [reviewResult.error, handleError]);

  const reviews = reviewResult.data?.product.reviews;

  return { refetch: () => reexecuteQuery({ requestPolicy: 'network-only' }), reviews };
};
