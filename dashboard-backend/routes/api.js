const express = require("express");
const badgeRouter = require("./badge");
const treasureRouter = require("./treasure");
const wallRouter = require("./wall");

const apiRouter = express.Router();

apiRouter.use("/wall", wallRouter);
apiRouter.use("/badge", badgeRouter);
apiRouter.use("/treasure-hunt", treasureRouter);

module.exports = apiRouter;
