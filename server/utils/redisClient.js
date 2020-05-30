const {promisify} = require('util');
const redis = require('redis');

const redisUrl = process.env.REDIS_URL;

const redisClient = redis.createClient(redisUrl);

redisClient.get = promisify(redisClient.get);

module.exports = redisClient;