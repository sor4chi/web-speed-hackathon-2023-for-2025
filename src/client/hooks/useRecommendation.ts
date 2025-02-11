import { useQuery } from 'urql';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';
import { GetRecommendationsQuery } from '../graphql/queries';

export const useRecommendation = () => {
  const [recommendationsResult] = useQuery<GetRecommendationsQueryResponse>({
    query: GetRecommendationsQuery,
  });

  const hour = new Date().getHours();
  const recommendations = recommendationsResult?.data?.recommendations;

  if (recommendations == null) {
    return { recommendation: undefined };
  }

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation };
};
