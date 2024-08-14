const express = require('express');
const UsuariosControler = require('../controlers/UsuariosControler');
const UsuariosRotas = express.Router();

const UsuariosControler = new UsuariosControler();

//crud
UsuariosRotas.get('/users', UsuariosControler.listar);
UsuariosRotas.post('/users', UsuariosControler.criar);
UsuariosRotas.put('/users', UsuariosControler.atualizar);
UsuariosRotas.delete('/users', UsuariosControler.deletar);

module.exports = UsuariosRotas;