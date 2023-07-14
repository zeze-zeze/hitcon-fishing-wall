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
