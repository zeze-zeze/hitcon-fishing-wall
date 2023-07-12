const { tokenUrlsafe } = require("./utils");

require("dotenv").config();

process.env.TZ = "Asia/Taipei";
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 5002;
/** @type {"production" | "development"} */
const NODE_ENV = process.env.NODE_ENV || "production";
const API_KEY =
  process.env.API_KEY ||
  (() => {
    const token = tokenUrlsafe();
    console.log(`Using random API_KEY:`);
    console.log(token);
    return token;
  })();

module.exports = {
  PORT,
  NODE_ENV,
  API_KEY,
};
