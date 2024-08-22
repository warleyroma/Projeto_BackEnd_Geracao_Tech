const connection = require('../config/connection');
const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

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

// Método para criar um novo usuário
UsuariosModel.criar = async (firstname, surname, email, password) => {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const usuario = await UsuariosModel.create({ firstname, surname, email, password: hashedPassword });
    return usuario;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error; // Lance o erro para ser tratado no controller
  }
};

// Método para atualizar um usuário
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

// Método para listar todos os usuários
UsuariosModel.listar = async () => {
  try {
    const usuarios = await UsuariosModel.findAll();
    return usuarios;
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return null;
  }
};

// Método para consultar um usuário por ID
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

// Método para consultar um usuário por email
UsuariosModel.consultarPorEmail = async (email) => {
  try {
    const usuario = await UsuariosModel.findOne({ where: { email } });
    if (!usuario) {
      throw new Error(`Usuário com email ${email} não encontrado`);
    }
    return usuario;
  } catch (error) {
    console.error("Erro ao consultar usuário por email:", error);
    return null;
  }
};

// Método para deletar um usuário
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

// Método para validar a senha de um usuário
UsuariosModel.prototype.validarSenha = async function (senha) {
  try {
    const isValid = await bcrypt.compare(senha, this.password);
    return isValid;
  } catch (error) {
    console.error("Erro ao validar senha:", error);
    return false;
  }
};

module.exports = UsuariosModel;