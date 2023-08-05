const express = require("express");
const {
  SchemaValidator,
  computeCardUidPath,
} = require("../../middlewares/validation");
const { apiKeyAuth } = require("../../middlewares/auth");
const {
  getEmojiWithUser,
  checkNonExistentUids,
  createOrUpdatePopcat,
  getPopcatWithUser,
  createEmojiRecord,
  createOrUpdateBadgeInfo,
  getDinoWithUser,
  createOrUpdateDino,
  deleteAndCreatePopcats,
  deleteAndCreateDinos,
  deleteAndCreateEmoji,
} = require("./handlers");

const router = express.Router();
router.use(express.json());

router.put(
  "/:cardUid",
  apiKeyAuth,
  computeCardUidPath,
  SchemaValidator("register_badge"),
  async (req, res) => {
    // #swagger.operationId = 'register_badge'
    /*  #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $username: "HITCON",
      }
    } */
    const { cardUid } = req.computed;
    const { username } = req.body;
    const record = await createOrUpdateBadgeInfo({ uid: cardUid, username });
    res.status(201).json(record);
  }
);

router.get("/popcat", async (req, res) => {
  const record = await getPopcatWithUser();
  res.json(record);
});

router.put(
  "/popcat/all",
  apiKeyAuth,
  SchemaValidator("put_all_popcat"),
  async (req, res) => {
    /*
      #swagger.operationId = "put_all_popcat"
      #swagger.parameters["body"] = {
        in: "body",
        "@schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "card_uid": {
                "type": "string",
                "pattern": "[0-9a-fA-F]{8}",
              },
              "score": {
                "type": "number",
              },
            },
            "required": ["card_uid", "score"]
          },
        }
      }
    */
    const data = req.body.map(({ card_uid, score }) => ({
      cardUid: Buffer.from(card_uid, "hex"),
      score,
    }));
    try {
      const result = await deleteAndCreatePopcats(data);
      res.status(201).json(result);
    } catch (error) {
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (typeof error.message === "string") {
          errorMsg.message = error.message.split("\n").pop();
        }
        res.status(400).json(errorMsg);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }
);

router.put(
  "/popcat/:cardUid",
  apiKeyAuth,
  computeCardUidPath,
  SchemaValidator("put_badge_popcat"),
  async (req, res) => {
    // #swagger.operationId = 'put_badge_popcat'
    /*  #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $score: 10.5,
      }
    } */
    const { cardUid } = req.computed;
    const { score } = req.body;
    const record = await createOrUpdatePopcat({ cardUid, score });
    res.status(201).json(record);
  }
);

router.get("/dino", async (req, res) => {
  const record = await getDinoWithUser();
  res.json(record);
});

router.put(
  "/dino/all",
  apiKeyAuth,
  SchemaValidator("put_all_dino"),
  async (req, res) => {
    /*
      #swagger.operationId = "put_all_dino"
      #swagger.parameters["body"] = {
        in: "body",
        "@schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "card_uid": {
                "type": "string",
                "pattern": "[0-9a-fA-F]{8}",
              },
              "score": {
                "type": "number",
              },
            },
            "required": ["card_uid", "score"]
          },
        }
      }
    */
    const data = req.body.map(({ card_uid, score }) => ({
      cardUid: Buffer.from(card_uid, "hex"),
      score,
    }));
    try {
      const result = await deleteAndCreateDinos(data);
      res.status(201).json(result);
    } catch (error) {
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (typeof error.message === "string") {
          errorMsg.message = error.message.split("\n").pop();
        }
        res.status(400).json(errorMsg);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }
);

router.put(
  "/dino/:cardUid",
  apiKeyAuth,
  computeCardUidPath,
  SchemaValidator("put_badge_dino"),
  async (req, res) => {
    /*
      #swagger.operationId = 'put_badge_dino'
      #swagger.parameters['body'] = {
        in: 'body',
        schema: {
          $score: 10.5,
        }
      }
     */
    const { cardUid } = req.computed;
    const { score } = req.body;
    const record = await createOrUpdateDino({ cardUid, score });
    res.status(201).json(record);
  }
);

router.get("/emoji", async (req, res) => {
  const data = await getEmojiWithUser();
  res.json(data);
});

router.put(
  "/emoji/all",
  apiKeyAuth,
  SchemaValidator("put_all_emoji"),
  async (req, res) => {
    /*
      #swagger.operationId = "put_all_emoji"
      #swagger.parameters["body"] = {
        in: "body",
        "@schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "card_uid": {
                "type": "string",
                "pattern": "[0-9a-fA-F]{8}",
              },
              "content": {
                "type": "string",
              },
              "timestamp": {
                "type": "string",
              },
            },
            "required": ["card_uid", "content", "timestamp"]
          },
        }
      }
    */
    const data = req.body.map(({ card_uid, content, timestamp }) => ({
      cardUid: Buffer.from(card_uid, "hex"),
      content,
      timestamp: new Date(timestamp),
    }));
    const uids = data.map((i) => i.cardUid);
    try {
      // check foreign key
      const missing = await checkNonExistentUids({ uids });
      if (missing.length > 0) {
        return res.status(400).json({
          error: "card not registerd",
          uids: missing.map((i) => i.uid.toString("hex")),
        });
      }

      const result = await deleteAndCreateEmoji(data);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (typeof error.message === "string") {
          errorMsg.message = error.message.split("\n").pop();
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
  "/emoji/:cardUid",
  apiKeyAuth,
  computeCardUidPath,
  SchemaValidator("post_badge_emoji"),
  async (req, res) => {
    // #swagger.operationId = 'post_badge_emoji'
    /*  #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $content: "😀",
        $timestamp: "2023-01-01",
      }
    } */
    const { cardUid } = req.computed;
    const { content } = req.body;
    const timestamp = Date.parse(req.body.timestamp);
    if (isNaN(timestamp)) {
      return res.status(400).json({ error: "Invalid timestamp" });
    }
    try {
      const record = await createEmojiRecord({
        cardUid,
        content,
        timestamp: new Date(timestamp),
      });
      res.status(201).json(record);
    } catch (error) {
      /** @type {string} */
      const errorType = error.constructor.name;
      if (errorType.startsWith("PrismaClient")) {
        const errorMsg = { error: errorType };
        if ("code" in error) errorMsg.code = error.code;
        if (error.code === "P2003") {
          errorMsg.message = "Card not registered";
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
