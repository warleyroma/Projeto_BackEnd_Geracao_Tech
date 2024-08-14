const express = require('express')

const host = "localhost"
const port = 3000

const app = express()

app.get('/', (request, response) => {
    return response.send ("Olá, eu sou um Backend com NodeJS + Express")
});

app.get('/produtos', (request, response) => {
    
    return response.send ("Olá, eu sou a página de produtos")
});

app.listen(port, host, () =>{
    console.log(`Servidor executando em http://${host}:${port}`)
});