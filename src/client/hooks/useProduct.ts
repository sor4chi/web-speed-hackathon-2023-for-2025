import type { GetProductDetailsQueryResponse } from '../graphql/queries';

export const useProduct = (_productId: number | undefined) => {
  const product = window.__PRODUCT_DETAILS__;

  return { product };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __PRODUCT_DETAILS__: GetProductDetailsQueryResponse['product'];
  }
}
