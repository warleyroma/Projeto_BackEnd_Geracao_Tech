const express = require('express');
const ProdutosController = require('../controlers/CategoriasController');
const ProdutosRotas = express.Router();

const produtosController = new ProdutosController();

//crud
ProdutosRotas.get('/v1/category/search', produtosController.listar);
ProdutosRotas.get('/v1/category/:id', produtosController.consultarPorId);
ProdutosRotas.post('/v1/category', produtosController.criar);
ProdutosRotas.put('/v1/category/:id', produtosController.atualizar);
ProdutosRotas.delete('/v1/category/:id', produtosController.deletar);

module.exports = ProdutosRotas;