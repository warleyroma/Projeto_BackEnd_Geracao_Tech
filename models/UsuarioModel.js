/*const { Sequelize } = require('sequelize');*/
const connection = require('../config/connection');
const { DataTypes } = require("sequelize");


const UsuariosModel = connection.define("User", {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  firstname: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  surname: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  timestamps: true, // Cria as colunas 'created_at' e 'updated_at'
});


UsuariosModel.criar = async (firstname, surname, email, password) => {
  try {
    const usuario = await UsuariosModel.create({ firstname, surname, email, password });
    return usuario;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error; // Lance o erro para ser tratado no controller
  }
};

UsuariosModel.atualizar = async (id, atualizacoes) => {
  try {
    // Encontra o usuário pelo ID
    const usuario = await UsuariosModel.findByPk(id);
    
    // Verifica se o usuário foi encontrado
    if (!usuario) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
    
    // Atualiza os dados do usuário com as novas informações
    await usuario.update(atualizacoes);
    
    return usuario; // Retorna o usuário atualizado
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
};



UsuariosModel.listar = async () => {
  try {
    const usuarios = await UsuariosModel.findAll();
    return usuarios;
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return null;
  }
};

UsuariosModel.consultarPorId = async (id) => {
  try {
    const usuario = await UsuariosModel.findByPk(id);
    if (!usuario) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  } catch (error) {
    console.error("Erro ao consultar usuário por ID:", error);
    return null;
  }
};

UsuariosModel.deletar = async (id) => {
  try {
    // Encontra o usuário pelo ID
    const usuario = await UsuariosModel.findByPk(id);
    
    // Verifica se o usuário foi encontrado
    if (!usuario) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
    
    // Deleta o usuário
    await usuario.destroy();
    return { message: `Usuário com ID ${id} deletado com sucesso` };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return null;
  }
};



module.exports = UsuariosModel;