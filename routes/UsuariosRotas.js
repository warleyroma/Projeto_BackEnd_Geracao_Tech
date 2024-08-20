const express = require('express');
const UsuariosControler = require('../controlers/UsuariosControler');
const UsuariosRotas = express.Router();

const usuariosControler = new UsuariosControler();

//crud
UsuariosRotas.get('/v1/users', usuariosControler.listar);
UsuariosRotas.get('/v1/users/:id', usuariosControler.consultarPorId);
UsuariosRotas.post('/v1/users', usuariosControler.criar);
UsuariosRotas.put('/v1/users/:id', usuariosControler.atualizar);
UsuariosRotas.delete('/v1/users/:id', usuariosControler.deletar);

module.exports = UsuariosRotas;