const redis = require("redis");
const path = require("path");
const { promisify } = require("util");
const { redisOptions } = require(path.resolve(__dirname, "../../config/config"))();
const { redisHost } = redisOptions;

const client = redis.createClient(redisHost);
const getAsync = promisify(client.get).bind(client);

client.on("connect", () => {
    console.log("Redis connected");
})

client.on("error", (err) => {
    console.error("Redis Error: " + err);
})

let redisHandler = {};

const getValue = async (key) => await getAsync(key);
const setValue = async (key, value) => client.set(key, value);
const getClient = () => client;

redisHandler.getValue = getValue;
redisHandler.setValue = setValue;
redisHandler.getClient = getClient;

module.exports = redisHandler;
