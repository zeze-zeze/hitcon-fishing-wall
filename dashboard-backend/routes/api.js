const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const badgeRouter = require("./badge");
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

  // Check if the user has already been submitted.
  if (!fs.existsSync(`./userdata/fish/${data.username}.json`)) {
    // Insert time.
    const date = new Date();
    const time = "" + date.toLocaleTimeString();
    data.time = time;

    // Check description.
    if (typeof(req.body.description) === "string") {
      data.description = req.body.description.substring(0, 256);
    } else {
      data.description = "QAQ";
    }

    data.flagCount = 0;

    // Insert data.
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

    // Update flagCount.
    if (Number(req.body.flagCount) > userdata["fish"][data.username]["flagCount"]) {
      data.flagCount = Number(req.body.flagCount);
    } else {
      data.flagCount = userdata["fish"][data.username]["flagCount"];
    }

    // Update data.
    userdata["fish"][data.username] = data;
  }

  // Write to file.
  console.log(data);
  fs.writeFile(
    `./userdata/fish/${data.username}.json`,
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  // Return data.
  res.header("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
});

apiRouter.post("/ctf", function (req, res) {});

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
