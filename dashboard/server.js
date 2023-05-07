const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs');

const port = 5002
process.env.TZ = 'Asia/Taipei';
const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

if (!fs.existsSync('userdata')) {
    fs.mkdirSync('userdata', 0744);
}

// app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/fishing', urlencodedParser, function(request, response){
    const host = request.headers.host
    console.log(host);
    console.log(request.url);
    console.log(request.body);
    const date = new Date();
    const time = '' + date.toLocaleTimeString();
    const username = request.body.username;
    const data = JSON.stringify({'time': time, 'username': username});
    console.log(data);
    fs.writeFile(`userdata/${username}.json`, data, err => {
        if (err) {
            console.error(err);
        }
    });
    response.write(data);
});

app.get('/fishing', function(request, response){
    
});

app.post('/ctf', function(request, response){
    
});

app.get('/ctf', function(request, response){
    
});

app.post('/badge', function(request, response){
    
});

app.get('/badge', function(request, response){
    
});

app.post('/geocaching', function(request, response){
    
});

app.get('/geocaching', function(request, response){
    
});

app.get('/dashboard', function(request, response){
    const category = request.query.category;
    console.log(category);
    if (category == 'fishing'){

    }
    else if (category == 'ctf'){

    }
    else if (category == 'badge'){

    }
    else if (category == 'geocaching'){

    }
    else {

    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})