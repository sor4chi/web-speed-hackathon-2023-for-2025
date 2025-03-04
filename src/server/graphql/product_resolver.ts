import { LimitedTimeOffer } from '../../model/limited_time_offer';
import type { Product } from '../../model/product';
import { ProductMedia } from '../../model/product_media';
import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const productResolver: GraphQLModelResolver<Product> = {
  media: (parent) => {
    return dataSource.manager.find(ProductMedia, {
      where: {
        product: {
          id: parent.id,
        },
      },
    });
  },
  offers: (parent) => {
    return dataSource.manager.find(LimitedTimeOffer, {
      where: {
        product: {
          id: parent.id,
        },
      },
    });
  },
  reviews: (parent) => {
    return dataSource.manager.find(Review, {
      where: {
        product: {
          id: parent.id,
        },
      },
    });
  },
};
