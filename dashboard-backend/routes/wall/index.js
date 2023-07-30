const express = require("express");
const { SchemaValidator } = require("../../middlewares/validation");
const {
  getFish,
  createFish,
  updateFishDescription,
  getFishFlagCount,
  updateFishFlagCount,
} = require("./handlers");
const { apiKeyAuth } = require("../../middlewares/auth");

const router = express.Router();
router.use(express.json());

router.get("/fish", async (req, res) => {
  const data = await getFish();
  res.json(data);
});

router.post("/fish", apiKeyAuth, SchemaValidator("post_fish"), async (req, res) => {
  /*
    #swagger.operationId = 'post_fish'
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "required": [
          "username",
          "token",
        ],
        "properties": {
          "username": {
            "type": "string",
            "minLength": 1,
          },
          "token": {
            "type": "string",
            "minLength": 1,
          },
        }
      }
    }
  */

  const username = req.body.username
    .substring(0, 64)
    .replace(/\0/g, "")
    .replace(/\//g, "");
  const token = req.body.token;
  const flagCount = 0;
  const description = "";

  try {
    const record = await createFish({
      username,
      token,
      description,
      flagCount,
    });
    res.status(201).json(record);
  } catch (error) {
    const errorType = error.constructor.name;
    if (errorType.startsWith("PrismaClient")) {
      const errorMsg = { error: errorType };
      if ("code" in error) errorMsg.code = error.code;
      errorMsg.message = "Create fish failed";
      res.status(400).json(errorMsg);
    } else {
      console.error(error);
      res.status(500).send();
    }
  }
});

router.post(
  "/description",
  apiKeyAuth,
  SchemaValidator("post_description"),
  async (req, res) => {
    /*
      #swagger.operationId = 'post_description'
      #swagger.parameters['body'] = {
        in: 'body',
        '@schema': {
          "required": [
            "username",
            "token",
            "description",
          ],
          "properties": {
            "username": {
              "type": "string",
              "minLength": 1,
            },
            "token": {
              "type": "string",
              "minLength": 1,
            },
            "description": {
              "type": "string",
            },
          }
        }
      }
    */

    const username = req.body.username
      .substring(0, 64)
      .replace(/\0/g, "")
      .replace(/\//g, "");
    const token = req.body.token;
    const description = req.body.description;

    try {
      const record = await updateFishDescription({
        username,
        token,
        description,
      });
      res.status(200).json(record);
    } catch (error) {
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (error.code === "P2025") {
          errorMsg.message = "Fish not found";
        }
        res.status(400).json(errorMsg);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }
);

router.post("/flag", apiKeyAuth, SchemaValidator("post_flag"), async (req, res) => {
  /*
    #swagger.operationId = 'post_flag'
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "required": [
          "username",
          "token",
          "flagCount",
        ],
        "properties": {
          "username": {
            "type": "string",
            "minLength": 1,
          },
          "token": {
            "type": "string",
            "minLength": 1,
          },
          "flagCount": {
            type: "integer",
          }
        }
      }
    }
  */

  const username = req.body.username
    .substring(0, 64)
    .replace(/\0/g, "")
    .replace(/\//g, "");
  const token = req.body.token;

  var oldFlagCount;
  try {
    oldFlagCount = await getFishFlagCount({
      username,
      token,
    });
  } catch (error) {
    const errorType = error.constructor.name;
    if (errorType.startsWith("PrismaClient") || errorType === "NotFoundError") {
      const errorMsg = { error: errorType };
      if ("code" in error) errorMsg.code = error.code;
      if (error.code === "P2025") {
        errorMsg.message = "Fish not found";
      }
      res.status(400).json(errorMsg);
    } else {
      console.error(error);
      res.status(500).send();
    }
    return;
  }

  const newFlagCount = parseInt(req.body.flagCount);
  if (newFlagCount < oldFlagCount) {
    res.status(400).json({ error: "Invalid flag count" });
    return;
  }

  try {
    const record = await updateFishFlagCount({
      username,
      token,
      flagCount: newFlagCount,
    });
    res.status(200).json(record);
  } catch (error) {
    const errorType = error.constructor.name;
    if (errorType.startsWith("PrismaClient")) {
      const errorMsg = { error: errorType };
      if ("code" in error) errorMsg.code = error.code;
      res.status(400).json(errorMsg);
    } else {
      console.error(error);
      res.status(500).send();
    }
  }
});

module.exports = router;
