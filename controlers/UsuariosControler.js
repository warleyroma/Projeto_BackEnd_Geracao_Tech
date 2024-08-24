const UsuariosModel = require('../models/UsuarioModel');
const { validarToken } = require('../middlewares/auth');

class UsuariosControler {
  async listar(req, res) {
    try {
      const usuarios = await UsuariosModel.listar();
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar usuários', error: err.message });
    }
  }

  async consultarPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await UsuariosModel.consultarPorId(id);
      if (!usuario) {
        return res.status(404).json({ message: `Usuário com ID ${id} não encontrado` });
      }
      res.status(200).json(usuario);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao consultar usuário', error: err.message });
    }
  }

  async criar(req, res) {
    const { firstname, surname, email, password } = req.body;
    try {
      // Aqui você pode adicionar validações para os dados de entrada

      const usuario = await UsuariosModel.criar(firstname, surname, email, password);
      res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const atualizacoes = req.body;
    try {
      const usuarioAtualizado = await UsuariosModel.atualizar(id, atualizacoes);
      if (!usuarioAtualizado) {
        return res.status(404).json({ message: `Usuário com ID ${id} não encontrado` });
      }
      res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const resultado = await UsuariosModel.deletar(id);
      if (!resultado) {
        return res.status(404).json({ message: `Usuário com ID ${id} não encontrado` });
      }
      res.status(200).json(resultado);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
    }
  }
}

module.exports = UsuariosControler;
