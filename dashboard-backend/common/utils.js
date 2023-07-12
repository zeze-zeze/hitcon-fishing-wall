const crypto = require("crypto");

async function buildDocs() {
  const swaggerAutogen = require("swagger-autogen")();

  // https://github.com/davibaltar/example-swagger-autogen-with-router/blob/main/swagger.js

  const doc = {
    info: {
      title: "HITCON CMT 2023 Dashboard API",
      description: "Auto generated API document",
    },
    host: "localhost:3000",
    schemes: ["http"],
    securityDefinitions: {
      apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "X-API-KEY",
        description: "Set API token in HTTP header with key X-API-KEY",
      },
    },
  };

  const outputFile = "./docs/swagger.json";
  const endpointsFiles = ["./server.js"];

  /* NOTE: if you use the express Router, you must pass in the
     'endpointsFiles' only the root file where the route starts,
     such as index.js, app.js, routes.js, ... */

  await swaggerAutogen(outputFile, endpointsFiles, doc);
}

function tokenUrlsafe(nbytes = 48) {
  return crypto.randomBytes(nbytes).toString("base64url");
}

module.exports = { buildDocs, tokenUrlsafe };
