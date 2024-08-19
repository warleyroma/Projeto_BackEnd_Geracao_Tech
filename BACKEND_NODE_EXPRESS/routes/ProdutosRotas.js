const express = require('express');
const ProdutosController = require('../controlers/CategoriasController');
const ProdutosRotas = express.Router();

const produtosController = new ProdutosController();

//crud
ProdutosRotas.get('/v1/product/search', produtosController.listar);
ProdutosRotas.get('/v1/product/:id', produtosController.consultarPorId);
ProdutosRotas.post('/v1/product', produtosController.criar);
ProdutosRotas.put('/v1/product/:id', produtosController.atualizar);
ProdutosRotas.delete('/v1/product/:id', produtosController.deletar);

module.exports = ProdutosRotas;