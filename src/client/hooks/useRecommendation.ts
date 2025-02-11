// import { useQuery } from 'urql';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';

// import type { GetRecommendationsQueryResponse } from '../graphql/queries';
// import { GetRecommendationsQuery } from '../graphql/queries';

export const useRecommendation = () => {
  // const [recommendationsResult] = useQuery<GetRecommendationsQueryResponse>({
  //   query: GetRecommendationsQuery,
  // });

  const hour = new Date().getHours();
  // const recommendations = recommendationsResult?.data?.recommendations;
  const recommendations = window.__RECOMMENDED_PRODUCTS__;

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
