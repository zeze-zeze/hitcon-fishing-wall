const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const express = require("express");
const swagger = require("../docs/swagger.json");
const { NODE_ENV } = require("../common/env");
const { buildDocs } = require("../common/utils");

let routes = transformSchema(swagger);
const ajv = new Ajv({ strict: false });
addFormats(ajv);

if (NODE_ENV === "development") {
  buildDocs().then(() => {
    console.log("Reload validation schema");
    delete require.cache[require.resolve("../docs/swagger.json")];
    routes = transformSchema(require("../docs/swagger.json"));
  });
}

/**
 * @param {import("../docs/swagger.json")} swagger
 * @returns {{[operationId: string]: {
 *   parameters: {
 *     in: string,
 *     schema?: any,
 *   }[]
 * }}}
 */
function transformSchema(swagger) {
  const paths = Object.values(swagger.paths)
    .reduce((accu, curr) => accu.concat(Object.values(curr)), [])
    .filter((i) => "operationId" in i);
  const obj = paths.reduce((accu, curr) => {
    accu[curr.operationId] = curr;
    return accu;
  }, {});
  return obj;
}

/** @param {string} operationId */
const SchemaValidator =
  (operationId) =>
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  (req, res, next) => {
    if (!operationId in routes) return next();
    const route = routes[operationId];
    const parameters = route.parameters;
    if (parameters === undefined) {
      return next();
    }
    // only validate body, url, query parameters currently
    const errors = [];
    const bodyParams = parameters.find((p) => p.in === "body");
    if (bodyParams !== undefined) {
      const validate = ajv.compile(bodyParams.schema);
      const valid = validate(req.body);
      if (!valid) errors.push(...validate.errors);
    }
    const pathParams = parameters.filter((i) => i.in === "path");
    if (pathParams.length > 0) {
      pathParams.forEach(({ name, required, ...p }) => {
        // p.type === 'string'
        const validate = ajv.compile(p);
        const valid = validate(req.params[name]);
        if (!valid)
          errors.push(
            ...validate.errors.map((i) => ({ ...i, instancePath: `/${name}` }))
          );
      });
    }
    const queryParams = parameters.filter((i) => i.in === "query");
    if (queryParams.length > 0) {
      // not appeared: undefined
      // appeared: typeof query will be string (may be empty)
      // query params after check: either undefined or valid
      queryParams.forEach(({ name, required, ...p }) => {
        if (required === true || req.query[name] !== undefined) {
          const validate = ajv.compile(p);
          const valid = validate(req.query[name]);
          if (!valid)
            errors.push(
              ...validate.errors.map((i) => ({
                ...i,
                instancePath: `/${name}`,
              }))
            );
        }
      });
    }
    if (errors.length > 0) {
      const error = ajv.errorsText(errors);
      res.status(400).json({ error });
    } else {
      next();
    }
  };

/**
 * Convert hex string to bytes (Buffer)
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function computeCardUidPath(req, res, next) {
  /* #swagger.parameters['cardUid'] = {
    in: 'path',
    pattern: '[0-9a-fA-F]{8}',
  } */
  if (req.computed === undefined) req.computed = {};
  req.computed.cardUid = Buffer.from(req.params.cardUid, "hex");
  next();
}

module.exports = { SchemaValidator, computeCardUidPath };
