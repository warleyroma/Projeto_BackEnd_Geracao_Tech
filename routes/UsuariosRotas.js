const express = require('express');
const UsuariosControler = require('../controlers/UsuariosControler');
const UsuariosRotas = express.Router();
const jwt = require('jsonwebtoken');

const usuariosControler = new UsuariosControler();

//crud
UsuariosRotas.get('/v1/users', usuariosControler.listar);
UsuariosRotas.get('/v1/users/:id', usuariosControler.consultarPorId);
UsuariosRotas.post('/v1/users', usuariosControler.criar);
UsuariosRotas.put('/v1/users/:id', usuariosControler.atualizar);
UsuariosRotas.delete('/v1/users/:id', usuariosControler.deletar);

// login
UsuariosRotas.post('/v1/login', async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await usuariosControler.consultarPorEmail(email);

  if (!usuario || !(await usuario.validarSenha(senha))) {
    return res.status(401).send({ error: 'Email ou senha inválidos' });
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return res.send({ token });
});


// registro
UsuariosRotas.post('/v1/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuario = await usuariosControler.criar({ nome, email, senha });

  return res.send({ message: 'Usuário criado com sucesso' });
});

module.exports = UsuariosRotas;