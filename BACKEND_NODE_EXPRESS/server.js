const express = require('express')
const UsuariosRotas = require('./routes/UsuariosRotas');

const host = "localhost"
const port = 3000

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    return response.send ("Olá, eu sou um Backend com NodeJS + Express")
});

app.use(UsuariosRotas);

app.listen(port, host, () =>{
    console.log(`Servidor executando em http://${host}:${port}`)
});