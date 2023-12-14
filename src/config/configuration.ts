import * as redisStore from 'cache-manager-redis-store';

export default () => {
  return {
    port:  process.env.PORT || 3000,
    store: process.env.NODE_ENV === 'test' ? redisStore.create() : redisStore ,
    databaseUrl: process.env.DATABASE_URL,
  }}

