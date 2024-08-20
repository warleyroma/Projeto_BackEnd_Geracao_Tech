const express = require('express');
const ProdutosController = require('../controlers/ProdutosController');
const ProdutosRotas = express.Router();


//crud
ProdutosRotas.get('/v1/product/search', ProdutosController.listar);
ProdutosRotas.get('/v1/product/:id', ProdutosController.consultarPorId);
ProdutosRotas.post('/v1/product', ProdutosController.criar);
ProdutosRotas.put('/v1/product/:id', ProdutosController.atualizar);
ProdutosRotas.delete('/v1/product/:id', ProdutosController.deletar);

module.exports = ProdutosRotas;