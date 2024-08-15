const express = require('express');
const PostsController = require('../controlers/PostsController');
const PostsRotas = express.Router();

const PostsController = new PostsController();

//crud
PostsRotas.get('/posts', PostsController.listar);
PostsRotas.get('/posts/:id', PostsController.consultarPorId);
PostsRotas.post('/posts', PostsController.criar);
PostsRotas.put('/posts/:id', PostsController.atualizar);
PostsRotas.delete('/posts/:id', PostsController.deletar);

module.exports = PostsRotas;