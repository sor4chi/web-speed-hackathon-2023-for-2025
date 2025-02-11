import { useQuery } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import type { GetProductReviewsQueryResponse } from '../graphql/queries';
import { GetProductReviewsQuery } from '../graphql/queries';

export const useReviews = (productId: number | undefined) => {
  const handleError = useErrorHandler();

  const reviewResult = useQuery<GetProductReviewsQueryResponse>(GetProductReviewsQuery, {
    onError: handleError,
    skip: !productId,
    variables: {
      productId,
    },
  });

  const reviews = reviewResult.data?.product.reviews;

  return { reviews };
};
