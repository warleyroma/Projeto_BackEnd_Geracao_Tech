const { createServer} = require('node:http');

const server = createServer((request, response) => {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end('Hello World');
});

server.listen(3000, '127.0.0.1', () => {
    console.log("Servidor executando http://127.0.0.1:3000")
});