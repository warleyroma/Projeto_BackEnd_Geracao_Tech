const express = require('express')
const UsuariosRotas = require('./routes/UsuariosRotas');
const CategoriasRotas = require('./routes/CategoriasRotas');
const ProdutosRotas = require('./routes/ProdutosRotas');
const connection = require('./config/connection');

const host = "localhost"
const port = 3000

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    return response.send ("Olá, eu sou um Backend com NodeJS + Express")
});

app.use(UsuariosRotas);
app.use(CategoriasRotas);
app.use(ProdutosRotas);

async function startServer() {
    try {
        await connection.sync({ alter: true });
        console.log('Modelos sincronizados com sucesso');
        app.listen(port, host, () => {
            console.log(`Servidor executando em http://${host}:${port}`);
        });
    } catch (error) {
        console.error('Erro ao sincronizar os modelos:', error);
        process.exit(1); // Encerra o processo em caso de erro
    }
}

startServer();

/*
app.listen(port, host, () =>{
    console.log(`Servidor executando em http://${host}:${port}`)
});*/