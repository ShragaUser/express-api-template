/* eslint-disable no-undef */
const path = require("path");
const { MongoClient: mongoClient } = require("mongodb");
const { mongoOptions } = require(path.resolve(__dirname, "../../config/config"))();
const { mongoUrl } = mongoOptions;

const getClient = () => mongoClient.connect(mongoUrl, { useNewUrlParser: true });

module.exports = { getClient };