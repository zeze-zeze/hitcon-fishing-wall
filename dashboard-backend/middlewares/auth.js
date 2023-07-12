const express = require("express");

/** @param {string} apiKey */
const Auth =
  (apiKey) =>
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  (req, res, next) => {
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    const reqApiKey = req.header("X-API-KEY");
    if (reqApiKey !== apiKey) {
      return res.status(401).send();
    }
    next();
  };

module.exports = { Auth };
