const express = require('express');
const CategoriasController = require('../controlers/CategoriasController');
const CategoriasRotas = express.Router();

const categoriasController = new CategoriasController();

//crud
CategoriasRotas.get('/v1/category/search', categoriasController.listar);
CategoriasRotas.get('/v1/category/:id', categoriasController.consultarPorId);
CategoriasRotas.post('/v1/category', categoriasController.criar);
CategoriasRotas.put('/v1/category/:id', categoriasController.atualizar);
CategoriasRotas.delete('/v1/category/:id', categoriasController.deletar);

module.exports = CategoriasRotas;