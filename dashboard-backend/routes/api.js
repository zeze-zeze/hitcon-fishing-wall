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

  if (activity === "fish") {
    userdata[activity] = {};
  } else {
    userdata[activity] = [];
  }
  fs.readdir(`./userdata/${activity}`, (err, files) => {
    console.log(files);
    files.forEach((file) => {
      fs.readFile(`./userdata/${activity}/${file}`, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(JSON.parse(data));

        if (activity === "fish") {
          const username = JSON.parse(data).username;
          userdata[activity][username] = JSON.parse(data);
        } else {
          userdata[activity].push(JSON.parse(data));
        }
      });
    });
  });
});

apiRouter.post("/fish", urlencodedParser, function (req, res) {
  const host = req.headers.host;
  console.log(host);
  console.log(req.url);
  console.log(req.body);

  if (typeof(req.body.username) !== "string" || req.body.username === "") {
    res.end("Invalid username");
    return;
  }

  const data = {};
  data.username = req.body.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
  data.token = req.body.token;

  if (!fs.existsSync(`./userdata/fish/${data.username}.json`)) {
    const date = new Date();
    const time = "" + date.toLocaleTimeString();
  
    if (typeof(req.body.description) === "string") {
      data.description = req.body.description.substring(0, 256);
    } else {
      data.description = "QAQ";
    }
    
    data.time = time;
    console.log(JSON.stringify(data));
    userdata["fish"][data.username] = data;
  } else {
    // Check token.
    if (data.token !== userdata["fish"][data.username]["token"]) {
      res.end("Invalid token");
      return;
    }

    // Time remains the same.
    data.time = userdata["fish"][data.username]["time"];

    // Update description.
    if (typeof(req.body.description) === "string" && req.body.description !== "") {
      data.description = req.body.description.substring(0, 256);
    } else {
      data.description = userdata["fish"][data.username]["description"];
    }

    // Update data.
    userdata["fish"][data.username] = data;
  }
  
  fs.writeFile(
    `./userdata/fish/${data.username}.json`,
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
