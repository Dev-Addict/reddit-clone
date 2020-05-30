const redis = require('redis');

const redisUrl = process.env.REDIS_URL;

const redisClient = redis.createClient(redisUrl);

module.exports = redisClient;