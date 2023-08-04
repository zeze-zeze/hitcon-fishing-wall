const express = require("express");
const { SchemaValidator } = require("../../middlewares/validation");
const { apiKeyAuth } = require("../../middlewares/auth");
const { createTreasureStats, getTreasureStats } = require("./handlers");

const router = express.Router();
router.use(express.json());

router.get("/stats", async (req, res) => {
  // return one record in every 3 minutes
  const stats = await getTreasureStats({ per_sec: 30 * 60 });
  res.json(stats);
});

router.post(
  "/stats",
  apiKeyAuth,
  SchemaValidator("post_treasure_stats"),
  async (req, res) => {
    /*
      #swagger.operationId = 'post_treasure_stats'
      #swagger.parameters['body'] = {
        in: 'body',
        schema: {
          $level_0: 0,
          $level_1: 0,
          $level_2: 0,
          $level_3: 0,
          $finished: 0,
        }
      }
    */
    const { level_0, level_1, level_2, level_3, finished } = req.body;
    const stats = await createTreasureStats({
      level_0,
      level_1,
      level_2,
      level_3,
      finished,
    });
    res.status(201).json(stats);
  }
);

module.exports = router;
