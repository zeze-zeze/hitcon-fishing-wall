const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const request = require('request')
const fs = require('fs')
const http = require('http')
const https = require('https')
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const config = require('config');

process.chdir(__dirname);

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
const httpPort = config.get('httpListenPort');
const httpsPort = config.get('httpsListenPort');
const dashboardServer = config.get('dashboardServer');
const dashboardApiKey = config.get('dashboardApiKey');
const dashboardWallFishApi = config.get('dashboardWallFishApi');
const dashboardWallDescriptionApi = config.get('dashboardWallDescriptionApi');
const dashboardWallFlagApi = config.get('dashboardWallFlagApi');

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const frontendPath = config.get('frontendPath');
app.use(express.static(path.join(__dirname, frontendPath)));
app.use(cookieParser());

// Receive the account information from fishing sites.
app.post('/fish', urlencodedParser, async function (req, res) {
    const data = {};
    var err, msg;

    // Check the username.
    if (typeof (req.body.username) === 'string') {
        data.username = req.body.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
    } else {
        data.username = "";
    }

    // If the token is not in cookies, generate a new token. Otherwise, use the duplicate token.
    if (req.cookies.token === undefined) {
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        const token = crypto.createHash('md5').update(randomNumber).digest('hex');
        data.token = token;
    } else {
        data.token = req.cookies.token;
    }

    if (data.username !== "") {
        // Request dashboard server to insert new fish.
        err = await fetch(`${dashboardServer + dashboardWallFishApi}`, {
            method: "POST",
            headers: {
                "X-API-KEY": dashboardApiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            }).catch((e) => {
                return { "message": "Unknown error" }
            });
    }

    // Set the error message.
    if (data.username === "") {
        msg = 2;
    }
    else if (err.message === "Create fish failed") {
        msg = 1;
    }
    else if (!err.message) {
        // Set cookie for username and token.
        res.cookie('username', data.username, { maxAge: 72 * 60 * 60 * 1000 });
        res.cookie('token', data.token, { maxAge: 72 * 60 * 60 * 1000 });

        msg = 0;
    }
    else {
        msg = -1;
    }

    // Redirect to introduction page.
    res.redirect('introduction/entrance?username=' + msg.toString());
});

app.post('/description', urlencodedParser, async function (req, res) {
    const data = {};
    var err, msg;

    // Check the username, token and description.
    if (typeof (req.cookies.username) === 'string') {
        data.username = req.cookies.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
    } else {
        data.username = "";
    }

    if (typeof (req.cookies.token) === 'string') {
        data.token = req.cookies.token.substring(0, 32);
    } else {
        data.token = "";
    }

    if (typeof (req.body.description) === 'string') {
        data.description = req.body.description.substring(0, 64);
    } else {
        data.description = "";
    }

    if (data.username !== "" && data.token !== "" && data.description !== "") {
        // Request dashboard server to update description.
        err = await fetch(`${dashboardServer + dashboardWallDescriptionApi}`, {
            method: "POST",
            headers: {
                "X-API-KEY": dashboardApiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            }).catch((e) => {
                return { "message": "Unknown error" }
            });;
    }

    // Set the error message.
    if (data.username === "") {
        msg = 1;
    }
    else if (data.token === "") {
        msg = 2;
    }
    else if (data.description === "") {
        msg = 3;
    }
    else if (err.message === "Fish not found") {
        msg = 4;
    }
    else if (!err.message) {
        msg = 0;
    }
    else {
        msg = -1;
    }

    // Redirect to introduction page.
    res.redirect('introduction/entrance?description=' + msg.toString());
});

// Receive flags.
app.post('/flag', urlencodedParser, async function (req, res) {
    const data = {};
    var err, msg;

    if (typeof (req.cookies.username) === 'string') {
        data.username = req.cookies.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
    } else {
        data.username = "";
        res.redirect('introduction/entrance?flag=3');
    }

    if (typeof (req.cookies.token) === 'string') {
        data.token = req.cookies.token.substring(0, 32);
    } else {
        data.token = "";
        res.redirect('introduction/entrance?flag=4');
    }

    // Check if the flags in cookies are valid.
    var flags;
    try {
        if (req.cookies.flags && Array.isArray(JSON.parse(req.cookies.flags))) {
            flags = JSON.parse(req.cookies.flags);
        } else {
            flags = [];
        }
    } catch {
        res.end("Invalid flags.");
        return;
    }

    // Check if the flag is valid.
    const answers = config.get('flagAnswers');
    if (typeof (req.body.flag) === "string" && !answers.includes(req.body.flag)) {
        res.redirect('introduction/entrance?flag=1');
    } else if (flags.includes(req.body.flag)) {
        res.redirect('introduction/entrance?flag=2');
    }
    flags.push(req.body.flag);

    // Count the number of the valid flags.
    var flagCount = 0;
    answers.forEach(answer => {
        if (flags.includes(answer)) {
            flagCount += 1;
        }
    });
    data.flagCount = flagCount;

    if (data.username !== "" && data.token !== "") {
        // Request dashboard server to update flag information.
        err = await fetch(`${dashboardServer + dashboardWallFlagApi}`, {
            method: "POST",
            headers: {
                "X-API-KEY": dashboardApiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            }).catch((e) => {
                return { "message": "Unknown error" }
            });
    }

    // Set the error message.
    if (err.message === "Fish not found") {
        msg = 5;
    }
    else if (!err.message) {
        // Set cookie for flags.
        res.cookie('flags', JSON.stringify(flags));

        msg = 0;
    }
    else {
        msg = -1;
    }

    // Redirect to introduction page.
    res.redirect('introduction/entrance?flag=' + msg.toString());
});


// Introduce hitcon fishing wall.
app.get('/introduction', function (req, res) {
    res.sendFile('frontend/introduction/index.html', { root: '../' });
});


// Display all fishing sites.
app.all('*', function (req, res) {
    const host = req.headers.host;
    const url = req.url;

    const phishingSites = config.get('phishingSites');

    phishingSites.forEach(phishingSite => {
        if (host.includes(phishingSite) || url.includes(phishingSite)) {
            res.sendFile(`frontend/${phishingSite}/index.html`, { root: '../' });
        }
    });

    res.sendFile('frontend/hitcon/index.html', { root: '../' });
});

httpServer.listen(httpPort, () => {
    console.log(`listening on port ${httpPort}`)
})

httpsServer.listen(httpsPort, () => {
    console.log(`listening on port ${httpsPort}`)
})