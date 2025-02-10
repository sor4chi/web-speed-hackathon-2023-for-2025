import DataLoader from 'dataloader';

import { ProductMedia } from '../../model/product_media';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

const productMediaLoader = new DataLoader<number, ProductMedia>(async (ids) => {
  const items = await dataSource
    .createQueryBuilder(ProductMedia, 'product_media')
    .whereInIds(ids)
    .leftJoinAndSelect('product_media.file', 'file')
    .getMany();

  return ids.map((id) => items.find((item) => item.id === id)!);
});

export const productMediaResolver: GraphQLModelResolver<ProductMedia> = {
  file: async (parent) => (await productMediaLoader.load(parent.id)).file,
};
