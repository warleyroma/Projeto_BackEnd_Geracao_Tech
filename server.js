const { createServer } = require('node:http');

const host = '127.0.0.1';
const port = 3000;

const server = createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    return response.end('Teste com nodemon!');
});

server.listen(port, host, () => {
    console.log(`PARABÉNS! Servidor executando http://${host}:${port}`)
});



