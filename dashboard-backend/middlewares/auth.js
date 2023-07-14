const express = require("express");
const { API_KEY } = require("../common/env");

// https://github.com/davibaltar/swagger-autogen/issues/213
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function apiKeyAuth(req, res, next) {
  /*
    #swagger.security = [{
      "apiKeyAuth": []
    }]
    #swagger.parameters["X-API-KEY"] = {
      in: "header",
      required: true,
    }
  */
  const reqApiKey = req.header("X-API-KEY");
  if (reqApiKey !== API_KEY) {
    return res.status(401).send();
  }
  next();
}

module.exports = { apiKeyAuth };
