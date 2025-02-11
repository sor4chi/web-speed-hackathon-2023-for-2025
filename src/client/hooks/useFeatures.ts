import { useQuery } from 'urql';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';
import { GetFeatureSectionsQuery } from '../graphql/queries';

export const useFeatures = () => {
  const [featuresResult] = useQuery<GetFeatureSectionsQueryResponse>({
    query: GetFeatureSectionsQuery,
  });

  const features = featuresResult.data?.features;

  return { features };
};
