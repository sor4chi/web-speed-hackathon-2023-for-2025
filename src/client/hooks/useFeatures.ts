import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';

export const useFeatures = () => {
  const features = window.__FEATURE_PRODUCTS__;

  return { features };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __FEATURE_PRODUCTS__: GetFeatureSectionsQueryResponse['features'];
  }
}
