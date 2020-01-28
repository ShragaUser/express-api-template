const redis = require("redis");
const path = require("path");
const { redisOptions } = require(path.resolve(__dirname, "../../config/config"))();
const { redisHost } = redisOptions;

const getClient = () => redis.createClient(redisHost);

module.exports = { getClient };
