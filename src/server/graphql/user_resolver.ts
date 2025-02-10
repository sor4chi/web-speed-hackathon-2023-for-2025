import { Order } from '../../model/order';
import { Profile } from '../../model/profile';
import { Review } from '../../model/review';
import type { User } from '../../model/user';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const userResolver: GraphQLModelResolver<User> = {
  orders: (parent) => {
    return dataSource.manager.find(Order, {
      where: {
        user: {
          id: parent.id,
        },
      },
    });
  },
  profile: (parent) => {
    return dataSource.manager.findOneOrFail(Profile, {
      where: {
        user: {
          id: parent.id,
        },
      },
    });
  },
  reviews: (parent) => {
    return dataSource.manager.find(Review, {
      where: {
        user: {
          id: parent.id,
        },
      },
    });
  },
};
