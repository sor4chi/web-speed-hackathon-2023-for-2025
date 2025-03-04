import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

import { koaMiddleware } from '@as-integrations/koa';
import gracefulShutdown from 'http-graceful-shutdown';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from 'koa-logger';
import route from 'koa-route';
import session from 'koa-session';
import serve from 'koa-static';

import { FeatureSection } from '../model/feature_section';
import { Product } from '../model/product';
import { Recommendation } from '../model/recommendation';
import { Review } from '../model/review';

import type { Context } from './context';
import { dataSource } from './data_source';
import { initializeApolloServer } from './graphql';
import { initializeDatabase } from './utils/initialize_database';
import { rootResolve } from './utils/root_resolve';

const PORT = Number(process.env.PORT ?? 8080);

const PRODUCT_ROUTE_REGEX = /^\/product\/(\d+)$/;

async function init(): Promise<void> {
  await initializeDatabase();
  await dataSource.initialize();

  const app = new Koa();
  app.use(compress());
  const httpServer = http.createServer(app.callback());

  app.keys = ['cookie-key'];
  app.use(logger());
  app.use(bodyParser());
  app.use(session({}, app));

  app.use(async (ctx, next) => {
    ctx.set('Cache-Control', 'no-store');
    await next();
  });

  const apolloServer = await initializeApolloServer();
  await apolloServer.start();

  app.use(
    route.all(
      '/graphql',
      koaMiddleware(apolloServer, {
        context: async ({ ctx }) => {
          return { session: ctx.session } as Context;
        },
      }),
    ),
  );

  app.use(
    route.post('/api/initialize', async (ctx) => {
      await initializeDatabase();
      ctx.status = 204;
    }),
  );

  let cacheTopHead: string | null = null;

  app.use(
    route.get('/', async (ctx) => {
      if (cacheTopHead == null) {
        const [recommendedProducts, featuredProducts] = await Promise.all([
          dataSource
            .createQueryBuilder(Recommendation, 'recommendation')
            .leftJoinAndSelect('recommendation.product', 'product')
            .leftJoinAndSelect('product.media', 'media')
            .leftJoinAndSelect('media.file', 'file')
            .getMany(),
          dataSource
            .createQueryBuilder(FeatureSection, 'featureSection')
            .leftJoinAndSelect('featureSection.items', 'items')
            .leftJoinAndSelect('items.product', 'product')
            .leftJoinAndSelect('product.offers', 'offers')
            .leftJoinAndSelect('product.media', 'media')
            .leftJoinAndSelect('media.file', 'file')
            .getMany(),
        ]);
        const thumbnails = recommendedProducts.map((recommendation) => {
          return recommendation.product.media.find((media) => media.isThumbnail)?.file.filename ?? '';
        });
        const additionalHeads = `
  ${thumbnails
    .map((thumbnail) => `<link rel="preload" href="${thumbnail.replace('.jpg', '-1024x576.webp')}" as="image">`)
    .join('\n')}
  <script>
  window.__RECOMMENDED_PRODUCTS__ = ${JSON.stringify(recommendedProducts)};
  window.__FEATURE_PRODUCTS__ = ${JSON.stringify(featuredProducts)};
  </script>
    `;
        cacheTopHead = additionalHeads;
      }
      const pwd = process.cwd();
      const rootResolve = (p: string) => path.resolve(pwd, p);
      let html = await readFile(rootResolve('dist/index.html'), { encoding: 'utf-8' });
      html = html.replace('<!-- INJECT -->', cacheTopHead);

      ctx.response.set('Content-Type', 'text/html');
      ctx.body = html;
    }),
  );

  app.use(serve(rootResolve('dist')));
  app.use(serve(rootResolve('public')));

  const cacheProductHeads: Record<number, string> = {};

  app.use(
    route.get('/*', async (ctx) => {
      let additionalHeads = '';
      const productRouteMatch = ctx.req.url?.match(PRODUCT_ROUTE_REGEX);
      if (productRouteMatch != null) {
        const productId = Number(productRouteMatch[1]);
        if (cacheProductHeads[productId] == null) {
          const product = await dataSource
            .createQueryBuilder(Product, 'product')
            .leftJoinAndSelect('product.offers', 'offers')
            .leftJoinAndSelect('product.media', 'media')
            .leftJoinAndSelect('media.file', 'file')
            .where('product.id = :productId', { productId })
            .getOneOrFail();
          cacheProductHeads[productId] = `
            <link rel="preload" href="${product.media[0].file.filename.replace('.jpg', '-1024x576.webp')}" as="image">
            <script>
            window.__PRODUCT_DETAILS__ = ${JSON.stringify(product)};
            </script>
            `;
        }
        additionalHeads += cacheProductHeads[productId];
        const review = await dataSource
          .createQueryBuilder(Review, 'review')
          .leftJoinAndSelect('review.user', 'user')
          .leftJoinAndSelect('user.profile', 'profile')
          .leftJoinAndSelect('profile.avatar', 'avatar')
          .where('review.product = :productId', { productId })
          .getMany();
        additionalHeads += `
      <script>
      window.__PRODUCT_REVIEW__ = ${JSON.stringify(review)};
      </script>
            `;
      }
      const pwd = process.cwd();
      const rootResolve = (p: string) => path.resolve(pwd, p);
      let html = await readFile(rootResolve('dist/index.html'), { encoding: 'utf-8' });
      if (additionalHeads != null) {
        html = html.replace('<!-- INJECT -->', additionalHeads);
      }

      ctx.response.set('Content-Type', 'text/html');
      ctx.body = html;
    }),
  );

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  gracefulShutdown(httpServer, {
    async onShutdown(signal) {
      console.log(`Received signal to terminate: ${signal}`);
      await apolloServer.stop();
      await dataSource.destroy();
    },
  });
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
