const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const apiRouter = express.Router();

const activities = ["fish", "ctf", "badge", "geocaching"];

// Initialize user data with the data stored in ./userdata.
if (!fs.existsSync("./userdata")) {
  fs.mkdirSync("./userdata", 0744);
}
const userdata = {};
activities.forEach((activity) => {
  if (!fs.existsSync(`./userdata/${activity}`)) {
    fs.mkdirSync(`./userdata/${activity}`, 0744);
  }

  userdata[activity] = [];
  fs.readdir(`./userdata/${activity}`, (err, files) => {
    console.log(files);
    files.forEach((file) => {
      fs.readFile(`./userdata/${activity}/${file}`, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(JSON.parse(data));
        userdata[activity].push(JSON.parse(data));
      });
    });
  });
});

apiRouter.post("/fish", urlencodedParser, function (req, res) {
  const host = req.headers.host;
  console.log(host);
  console.log(req.url);
  console.log(req.body);
  const date = new Date();
  const time = "" + date.toLocaleTimeString();
  const username = req.body.username;

  var description;
  if (typeof req.body.description === "string") {
    description = req.body.description;
  } else {
    description = "QAQ";
  }

  const data = { time: time, username: username, description: description };
  console.log(JSON.stringify(data));

  if (!fs.existsSync(`./userdata/fish/${username}.json`)) {
    userdata["fish"].push(data);
  }
  fs.writeFile(
    `./userdata/fish/${username}.json`,
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  res.header("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
});

apiRouter.post("/ctf", function (req, res) {});

const badgeRouter = express.Router();
badgeRouter.put("/users/:cardId", (req, res) => {
  const { cardId } = req.params;
  /**
   * @type {{
   *    username: string | null,
   *    message: string,
   * }}
   */
  const { username, message } = req.body;
  const now = new Date();
  const updatedAt = now.toISOString();
  const filepath = `${req.data_dir}/${cardId}.json`;
  const existed = fs.existsSync(filepath);
  const createdAt = existed
    ? JSON.parse(fs.readFileSync(filepath, "utf-8")).createdAt
    : now.toISOString();
  const obj = { cardId, username, message, updatedAt, createdAt };
  fs.writeFileSync(filepath, JSON.stringify(obj));
  return res.status(200).json(obj);
});
apiRouter.use(
  "/badge",
  jsonParser,
  (req, res, next) => {
    req.data_dir = "./userdata/badge";
    next();
  },
  badgeRouter
);

apiRouter.post("/geocaching", function (req, res) {});

apiRouter.get("/dashboard", function (req, res) {
  const category = req.query.category;
  res.header("Content-Type", "application/json; charset=utf-8");

  if (category == "fish") {
    res.end(JSON.stringify(userdata["fish"]));
  } else if (category == "ctf") {
    res.end(JSON.stringify(userdata["ctf"]));
  } else if (category == "badge") {
    res.end(JSON.stringify(userdata["badge"]));
  } else if (category == "geocaching") {
    res.end(JSON.stringify(userdata["geocaching"]));
  } else {
    res.end("unknown category");
  }
});

module.exports = apiRouter;
