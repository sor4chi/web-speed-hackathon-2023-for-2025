import { useQuery } from 'urql';

import { GetFeatureSectionsQuery, type GetFeatureSectionsQueryResponse } from '../graphql/queries';

export const useFeatures = () => {
  const [featuresResult] = useQuery<GetFeatureSectionsQueryResponse>({
    pause: window.__RECOMMENDED_PRODUCTS__ != null,
    query: GetFeatureSectionsQuery,
  });
  const features = featuresResult.data?.features || window.__FEATURE_PRODUCTS__;

  return { features };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __FEATURE_PRODUCTS__: GetFeatureSectionsQueryResponse['features'];
  }
}
