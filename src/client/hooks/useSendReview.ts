import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'urql';

import type { SendReviewMutationResponse } from '../graphql/mutations';
import { SendReviewMutation } from '../graphql/mutations';

import { useProduct } from './useProduct';

export const useSendReview = (productId: number | undefined) => {
  const { refetch } = useProduct(productId);
  const handleError = useErrorHandler();
  const [res, sendReview] = useMutation<SendReviewMutationResponse>(SendReviewMutation);

  useEffect(() => {
    if (res.error) {
      handleError(res.error);
    }
  }, [res.error, handleError]);

  return {
    sendReview: (comment: string, productId: number) =>
      sendReview({ comment, productId }).then(() => {
        console.log('Review sent');
        refetch();
      }),
  };
};
