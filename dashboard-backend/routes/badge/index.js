const express = require("express");
const { SchemaValidator } = require("../../middlewares/validation");
const { Auth } = require("../../middlewares/auth");
const {
  getEmojiWithUser,
  createOrUpdatePopcat,
  getPopcatWithUser,
  createEmojiRecord,
  createOrUpdateBadgeInfo,
} = require("./handlers");
const { API_KEY } = require("../../common/env");

const router = express.Router();

// https://github.com/davibaltar/swagger-autogen/issues/213
const _auth = Auth(API_KEY);
const auth = (req, res, next) => {
  /* #swagger.security = [{
    "apiKeyAuth": []
  }] */
  return _auth(req, res, next);
};

router.put(
  "/:cardId",
  auth,
  SchemaValidator("register_badge"),
  async (req, res) => {
    // #swagger.operationId = 'register_badge'
    /*  #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $username: "HITCON",
      }
    } */
    const { cardId } = req.params;
    const { username } = req.body;
    const record = await createOrUpdateBadgeInfo({ uid: cardId, username });
    res.status(201).json(record);
  }
);

router.get("/popcat", async (req, res) => {
  const record = await getPopcatWithUser();
  res.json(record);
});

router.put(
  "/popcat/:cardId",
  auth,
  SchemaValidator("put_badge_popcat"),
  async (req, res) => {
    // #swagger.operationId = 'put_badge_popcat'
    /*  #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $score: 10.0,
      }
    } */
    const { cardId } = req.params;
    const { score } = req.body;
    const record = await createOrUpdatePopcat({ cardUid: cardId, score });
    res.status(201).json(record);
  }
);

router.get("/emoji", async (req, res) => {
  const data = await getEmojiWithUser();
  res.json(data);
});

router.post(
  "/emoji/:cardId",
  auth,
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
    const { cardId } = req.params;
    const { content } = req.body;
    const timestamp = Date.parse(req.body.timestamp);
    if (isNaN(timestamp)) {
      return res.status(400).json({ error: "Invalid timestamp" });
    }
    const record = await createEmojiRecord({
      cardUid: cardId,
      content,
      timestamp: new Date(timestamp),
    });
    res.status(201).json(record);
  }
);

module.exports = router;
