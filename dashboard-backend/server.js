const express = require("express");
const path = require("path");
const { PORT, NODE_ENV } = require("./common/env");
const apiRouter = require("./routes/api");

const frontendDir = path.join(__dirname, "./dist");

const app = express();

if (NODE_ENV == "development") {
  app.use((req, res, next) => {
    console.log(req.url);
    next();
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
