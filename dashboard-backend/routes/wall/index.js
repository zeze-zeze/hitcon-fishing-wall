const express = require("express");
const {
  SchemaValidator,
  computeCardUidPath,
} = require("../../middlewares/validation");
const { apiKeyAuth } = require("../../middlewares/auth");
const {
  getEmojiWithUser,
  createOrUpdatePopcat,
  getPopcatWithUser,
  createEmojiRecord,
  createOrUpdateBadgeInfo,
  getDinoWithUser,
  createOrUpdateDino,
} = require("./handlers");

const router = express.Router();

router.get("/fish", async (req, res) => {
  const data = await getFish();
  res.json(data);
});

router.post(
  "/fish",
  async (req, res) => {
    const { content } = req.body;
    if (typeof(content.username) !== "string" || content.username === "") {
      res.end("Invalid username");
      return;
    }

    if (typeof(content.token) !== "string" || content.token === "") {
      res.end("Invalid token");
      return;
    }

    const date = new Date();
    const time = date.toLocaleTimeString();
    const username = content.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
    const token = content.token;
    const flagCount = 0;
    const description = "";

    try {
      const record = await createFish({
        username,
        time,
        token,
        description,
        flagCount
      });
      res.status(201).json(record);
    } catch (error) {
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (error.code === "P2003") {
          errorMsg.message = "Fish not registered";
        }
        res.status(400).json(errorMsg);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }
);

router.post(
  "/description",
  async (req, res) => {
    const { content } = req.body;
    if (typeof(content.username) !== "string" || content.username === "") {
      res.end("Invalid username");
      return;
    }

    if (typeof(content.token) !== "string" || content.token === "") {
      res.end("Invalid token");
      return;
    }

    if (typeof(content.description) !== "string") {
      res.end("Invalid description");
      return;
    }

    const username = content.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
    const token = content.token;
    const description = content.description;

    try {
      const record = await updateFishDescription({
        username,
        token,
        description,
      });
      res.status(201).json(record);
    } catch (error) {
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (error.code === "P2003") {
          errorMsg.message = "Fish not registered";
        }
        res.status(400).json(errorMsg);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }
);

router.post(
  "/flag",
  async (req, res) => {
    const { content } = req.body;
    if (typeof(content.username) !== "string" || content.username === "") {
      res.end("Invalid username");
      return;
    }

    if (typeof(content.token) !== "string" || content.token === "") {
      res.end("Invalid token");
      return;
    }

    const username = req.body.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
    const token = req.body.token;

    var oldFlagCount;
    try {
      oldFlagCount = await getFishFlagCount({
        username,
        token
      });
    } catch (error) {
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (error.code === "P2003") {
          errorMsg.message = "Fish not registered";
        }
        res.status(400).json(errorMsg);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }

    const newFlagCount = req.body.flagCount;
    if (newFlagCOunt < oldFlagCount){
      res.end("Invalid flag count");
      return;
    }

    try {
      const record = await updateFishFlagCount({
        username,
        token,
        flagCount: newFlagCount
      });
      res.status(201).json(record);
    } catch (error) {
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (error.code === "P2003") {
          errorMsg.message = "Fish not registered";
        }
        res.status(400).json(errorMsg);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }
);

module.exports = router;
