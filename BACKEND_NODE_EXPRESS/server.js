const express = require('express')

const host = "localhost"
const port = 3000

const app = express()

app.get('/', (request, response) => {
    return response.send ("Olá, eu sou um Backend com NodeJS + Express")
});

//crud

app.get('/users', (request, response) => {

    return response.send ("Olá, eu sou a página de produtos")
});

app.post('/users', (request, response) => {

    return response.status (200).send("Produto adicionado")
});

app.put('/users', (request, response) => {

    return response.status (200).send("Produto atualizado")
});

app.delete('/users', (request, response) => {

    return response.status (200).send("Produto deletado")
});


app.listen(port, host, () =>{
    console.log(`Servidor executando em http://${host}:${port}`)
});