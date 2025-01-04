import { createClient } from 'redis';

// Create a new Redis client
const cacheClient = createClient({ url: process.env.REDIS_URL });

export { cacheClient };

