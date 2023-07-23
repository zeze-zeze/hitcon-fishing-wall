const express = require("express");
const badgeRouter = require("./badge");
const wallRouter = require("./wall");

const apiRouter = express.Router();

apiRouter.use("/wall", wallRouter);

apiRouter.post("/ctf", function (req, res) {});

apiRouter.use("/badge", badgeRouter);

apiRouter.post("/geocaching", function (req, res) {});

apiRouter.get("/dashboard", function (req, res) {
  const category = req.query.category;

  if (category == "ctf") {
    res.json([]);
  } else if (category == "geocaching") {
    res.json([]);
  } else {
    res.json({ error: "unknown category" });
  }
});

module.exports = apiRouter;
