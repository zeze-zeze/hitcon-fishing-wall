const express = require("express");
const path = require("path");
const { PORT, NODE_ENV } = require("./common/env");
const apiRouter = require("./routes/api");
const { badge } = require("./common");

const frontendDir = path.join(__dirname, "./dist");

const app = express();

if (NODE_ENV === "development") {
  app.use("/docs", express.static(path.join(__dirname, "docs")));
  app.use((req, res, next) => {
    if (req.url === "/favicon.ico") return next();
    console.log(req.url);
    next();
  });
  badge.popcatRecord
    .findFirst({})
    .then((data) => {
      console.log("find first");
      console.log(data);
    })
    .catch((e) => {
      console.log("error");
      console.log(e);
    });
}

app.use(express.static(frontendDir));
app.use("/api/v1", apiRouter);

// Keep as the last route
app.get("*", (req, res) => {
  if (!req.originalUrl.startsWith("/api")) {
    return res.sendFile(path.join(frontendDir, "index.html"));
  }
  return res.status(404).send();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
