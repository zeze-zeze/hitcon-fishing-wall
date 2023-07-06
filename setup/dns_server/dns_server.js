const dns = require('native-dns');
const server = dns.createServer();

server.on('request', function (request, response) {
    console.log(request)
    response.answer.push(dns.A({
        name: request.question[0].name,
        address: '10.198.0.1',
        ttl: 600,
    }));
    setTimeout(() => {
        response.send();
    }, 1000)
});

server.on('error', function (err, buff, req, res) {
    console.log(err.stack);
});

server.serve(53);

