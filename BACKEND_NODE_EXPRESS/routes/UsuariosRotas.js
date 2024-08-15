const express = require('express');
const UsuariosControler = require('../controlers/UsuariosControler');
const UsuariosRotas = express.Router();

const usuariosControler = new UsuariosControler();

//crud
UsuariosRotas.get('/users', usuariosControler.listar);
UsuariosRotas.get('/users/:id', usuariosControler.consultarPorId);
UsuariosRotas.post('/users', usuariosControler.criar);
UsuariosRotas.put('/users/:id', usuariosControler.atualizar);
UsuariosRotas.delete('/users/:id', usuariosControler.deletar);

module.exports = UsuariosRotas;