const { createServer } = require('node:http');
const listarProdutos = require('./routes/produtos');

const host = '127.0.0.1';
const port = 3000;

const app = createServer((request, response) => {

    const { url, method } = request

    if (url === '/'){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        return response.end ("Olá NodeJS, servidor OK.");
    }

    
    if (url === '/produtos'){

        const dados = listarProdutos();

        response.writeHead(200, {'Content-Type': 'application/json'});
        return response.end (JSON.stringify(dados));
    }


    response.writeHead(404, { 'Content-Type': 'text/plain' });
    return response.end('Página não encontrada');
});

app.listen(port, host, () => {
    console.log(`PARABÉNS! Servidor executando http://${host}:${port}`)
});



