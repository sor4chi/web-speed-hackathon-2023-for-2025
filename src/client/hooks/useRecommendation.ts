import { useQuery } from 'urql';

import { GetRecommendationsQuery, type GetRecommendationsQueryResponse } from '../graphql/queries';

export const useRecommendation = () => {
  const [recommendationsResult] = useQuery<GetRecommendationsQueryResponse>({
    pause: window.__RECOMMENDED_PRODUCTS__ != null,
    query: GetRecommendationsQuery,
  });

  const hour = new Date().getHours();
  const recommendations = recommendationsResult.data?.recommendations || window.__RECOMMENDED_PRODUCTS__;

  if (recommendations == null) {
    return { recommendation: undefined };
  }

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __RECOMMENDED_PRODUCTS__: GetRecommendationsQueryResponse['recommendations'];
  }
}
