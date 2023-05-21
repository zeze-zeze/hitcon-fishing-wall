const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs');

const port = 5002
process.env.TZ = 'Asia/Taipei';
const app = express();
const activities = ['fish', 'ctf', 'badge', 'geocaching'];
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, './')));

// Initialize user data with the data stored in ./userdata.
if (!fs.existsSync('./userdata')) {
    fs.mkdirSync('./userdata', 0744);
}
const userdata = {};
activities.forEach(activity => {
    if (!fs.existsSync(`./userdata/${activity}`)) {
        fs.mkdirSync(`./userdata/${activity}`, 0744);
    }   

    userdata[activity] = [];
    fs.readdir(`./userdata/${activity}`, (err, files) => {
        console.log(files);
        files.forEach(file => {
            fs.readFile(`./userdata/${activity}/${file}`, 'utf8', (err, data) => {
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

app.post('/fish', urlencodedParser, function(req, res){
    const host = req.headers.host;
    console.log(host);
    console.log(req.url);
    console.log(req.body);
    const date = new Date();
    const time = '' + date.toLocaleTimeString();
    const username = req.body.username;

    var description;
    if (typeof(req.body.description) === 'string') {
        description = req.body.description;
    }
    else {
        description = 'QAQ';
    }
    
    const data = {'time': time, 'username': username, 'description': description};
    console.log(JSON.stringify(data));

    if (!fs.existsSync(`./userdata/fish/${username}.json`)) {
        userdata['fish'].push(data);
    }
    fs.writeFile(`./userdata/fish/${username}.json`, JSON.stringify(data), err => {
        if (err) {
            console.error(err);
        }
    });

    res.header("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(data));
});

app.post('/ctf', function(req, res){
    
});

app.post('/badge', function(req, res){
    
});

app.post('/geocaching', function(req, res){
    
});

app.get('/dashboard', function(req, res){
    const category = req.query.category;
    res.header("Content-Type", "application/json; charset=utf-8");
    
    if (category == 'fish'){
        res.end(JSON.stringify(userdata['fish']));
    }
    else if (category == 'ctf'){
        res.end(JSON.stringify(userdata['ctf']));
    }
    else if (category == 'badge'){
        res.end(JSON.stringify(userdata['badge']));
    }
    else if (category == 'geocaching'){
        res.end(JSON.stringify(userdata['geocaching']));
    }
    else {
        res.end('unknown category');
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})