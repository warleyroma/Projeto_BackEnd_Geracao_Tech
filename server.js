const express = require('express');
const UsuariosRotas = require('./routes/UsuariosRotas');
const CategoriasRotas = require('./routes/CategoriasRotas');
const ProdutosRotas = require('./routes/ProdutosRotas');
const connection = require('./config/connection');
const cors = require('cors');
const { validarToken } = require('./middlewares/auth');

const host = "localhost";
const port = 3000;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/', (request, response) => {
  return response.send("Olá, eu sou um Backend com NodeJS + Express");
});

app.use('/usuarios', validarToken, UsuariosRotas);
app.use('/categorias', validarToken, CategoriasRotas); // Protege a rota de categorias
app.use('/produtos', validarToken, ProdutosRotas); // Protege a rota de produtos

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
``
