const { createServer} = require('node:http');

const server = createServer((request, response) => {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    request.end('Hello World');
});

