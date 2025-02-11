import { cacheExchange, Client, fetchExchange } from 'urql';

export const uqrlClient = new Client({
  exchanges: [cacheExchange, fetchExchange],
  url: '/graphql',
});
