process.env.TZ = "Asia/Taipei";
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 5002;
/** @type {"production" | "development"} */
const NODE_ENV = process.env.NODE_ENV || "production";

module.exports = {
  PORT,
  NODE_ENV,
};
