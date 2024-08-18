const express = require('express');
const CategoriasController = require('../controlers/CategoriasController');
const CategoriasRotas = express.Router();

const CategoriasController = new PostsController();

//crud
CategoriasRotas.get('/v1/category/search', CategoriasController.listar);
CategoriasRotas.get('/v1/category/:id', CategoriasController.consultarPorId);
CategoriasRotas.post('/v1/category', CategoriasController.criar);
CategoriasRotas.put('/v1/category/:id', CategoriasController.atualizar);
CategoriasRotas.delete('/posts/:id', CategoriasController.deletar);

module.exports = PostsRotas;