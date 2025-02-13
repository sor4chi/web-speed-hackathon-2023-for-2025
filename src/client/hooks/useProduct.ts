import { useQuery } from 'urql';

import { GetProductDetailsQuery, type GetProductDetailsQueryResponse } from '../graphql/queries';

export const useProduct = (_productId: number | undefined) => {
  const [productResponse] = useQuery<GetProductDetailsQueryResponse>({
    pause: window.__PRODUCT_DETAILS__ != null,
    query: GetProductDetailsQuery,
    variables: { productId: _productId },
  });

  const product = productResponse.data?.product ?? window.__PRODUCT_DETAILS__;

  return { product };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __PRODUCT_DETAILS__: GetProductDetailsQueryResponse['product'];
  }
}
