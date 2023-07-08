const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const request = require('request')
const fs = require('fs')
const http = require('http')
const https = require('https')
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

process.chdir(__dirname);

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
const httpPort = 5080
const httpsPort = 5443
const dashboardServer = 'http://127.0.0.1:5002/api/v1'

const privateKey  = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(cookieParser());

// Receive the account information from fishing sites.
app.post('/fish', urlencodedParser, function(req, res){
    const data = {};
    data.username = req.body.username;
    if (typeof(req.body.username) === 'string'){
        data.username = req.body.username.substring(0, 64).replace(/\0/g, '').replace(/\//g, '');
    } else {
        data.username = "";
    }

    if (typeof(req.body.description) === 'string') {
        data.description = req.body.description.substring(0, 256);
    } else {
        data.description = "QAQ";
    }

    if (req.cookies.token === undefined) {
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        const token = crypto.createHash('md5').update(randomNumber).digest('hex');
        data.token = token;
    } else {
        data.token = req.cookies.token;
    }

    data.flagCount = 0;
    
    if (data.username !== "") {
        // Set cookie.
        res.cookie('username', data.username);
        res.cookie('token', data.token);

        // Request dashboard server to update fish information.
        console.log(data);
        request({
            uri: `${dashboardServer}/fish`,
            method: 'POST',
            form: data
        }, function(error, res, body) {
            if (error) {
                console.log(error);
            }
        });
    }

    // Redirect to introduction page.
    res.redirect('introduction');
});

// Introduce hitcon fishing wall.
app.get('/introduction', function(req, res){
    // TODO: 科普惡意 wifi 的危害以及辨認方法
    // TODO: 告知綿羊這個 wifi 不會偷其他的東西，並且綿羊牆是匿名的，請綿羊放心
    // TODO: 請他去連官方提供的 wifi
    // TODO: 告知他釣魚牆的相關資訊，e.g. 位置、釣魚牆統計資料
    res.sendFile('frontend/introduction/index.html', {root: '../'});
});

// Receive flags.
app.post('/flag', urlencodedParser, function(req, res){
    // Check if the username and token in cookies are valid.
    if (typeof(req.cookies.username) !== "string" || typeof(req.cookies.token) !== "string"){
        res.end("Invalid username or token.");
        return;
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
    const answers = ["FLAG{y0u_f0und_f4c3book}", "FLAG{YoU_F0uNd_Gm41L}", "FLAG{y0u_f0und_kktix}", "FLAG{y0u_f0und_tw1tt3r}", "FLAG{y0u_f0und_g1thub}"];
    if (typeof(req.body.flag) === "string" && !answers.includes(req.body.flag)){
        res.end("Wrong flag.");
        return;
    } else if (flags.includes(req.body.flag)){
        res.end("Duplicate flag.");
        return;
    }
    flags.push(req.body.flag);
    res.cookie('flags', JSON.stringify(flags));

    // Count the number of the valid flags.
    var flagCount = 0;
    answers.forEach(answer => {
        if (flags.includes(answer)){
            flagCount += 1;
        }
    });

    // Request dashboard server to update flag information.
    const data = {};
    data.username = req.cookies.username;
    data.token = req.cookies.token;
    data.description = "";
    data.flagCount = flagCount;
    console.log(data);
    request({
        uri: `${dashboardServer}/fish`,
        method: 'POST',
        form: data
    }, function(error, res, body) {
        if (error) {
            console.log(error);
        }
    });

    // Redirect to introduction page.
    res.redirect('introduction')
});

// Display all fishing sites.
app.all('*', function(req, res){
    // TODO: Redirect to fishing sites based on the request url.
    const host = req.headers.host
    console.log(host)
    console.log(req.url);
    
    if (host.includes('facebook')){
        res.sendFile('frontend/facebook/index.html', {root: '../'});
    }
    else if (host.includes('gmail')){
        res.sendFile('frontend/gmail/index.html', {root: '../'});
    }
    else if (host.includes('kktix')){
        res.sendFile('frontend/kktix/index.html', {root: '../'});
    }
    else if (host.includes('twitter')){
        res.sendFile('frontend/twitter/index.html', {root: '../'});
    }
    else if (host.includes('github')){
        res.sendFile('frontend/github/index.html', {root: '../'});
    }
    else if (host.includes('linkedin')){
        res.sendFile('frontend/linkedin/index.html', {root: '../'});
    }
    else if (host.includes('instagram')){
        res.sendFile('frontend/instagram/index.html', {root: '../'});
    }
    else if (host.includes('hackmd')){
        res.sendFile('frontend/hackmd/index.html', {root: '../'});
    }
    else{
        res.sendFile('frontend/hitcon/index.html', {root: '../'});
    }
});

httpServer.listen(httpPort, () => {
    console.log(`listening on port ${httpPort}`)
})

httpsServer.listen(httpsPort, () => {
    console.log(`listening on port ${httpsPort}`)
})