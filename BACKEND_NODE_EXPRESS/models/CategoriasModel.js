/*const { Sequelize } = require('sequelize');*/
const connection = require('../config/connection');
const { DataTypes } = require("sequelize");


const CategoriasModel = connection.define("categoria", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Preenchimento obrigatório
        validate: {
            notEmpty: true // Não pode ser vazio
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false, // Preenchimento obrigatório
        validate: {
            notEmpty: true // Não pode ser vazio
        }
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Valor padrão 0
    }
}, {
    timestamps: true, // Gera as colunas created_at e updated_at
    tableName: 'categoria'
});


CategoriasModel.criar = async (name, slug, use_in_menu) => {
    try {
        const categoria = await CategoriasModel.create({ name, slug, use_in_menu });
        return categoria;
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        throw error; // Lance o erro para ser tratado no controller
    }
};

CategoriasModel.atualizar = async (id, atualizacoes) => {
    try {
      // Encontra a categoria pelo ID
      const categoria = await CategoriasModel.findByPk(id);
  
      // Verifica se a categoria foi encontrada
      if (!categoria) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
      }
  
      // Atualiza os dados da categoria com as novas informações
      await categoria.update(atualizacoes);
  
      return categoria; // Retorna a categoria atualizada
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      return null;
    }
  };
  



CategoriasModel.listar = async ({ limit = 12, page = 1, fields = [], use_in_menu } = {}) => {
    try {
        const queryOptions = {
            attributes: fields.length ? fields : undefined, // Seleciona apenas os campos especificados
            where: {},
            limit: limit === -1 ? undefined : limit, // Remove limite se limit for -1
            offset: limit === -1 ? undefined : (page - 1) * limit // Calcula o offset para paginação
        };

        if (use_in_menu !== undefined) {
            queryOptions.where.use_in_menu = use_in_menu === 'true'; // Filtra pelas categorias que podem aparecer no menu
        }

        const categorias = await CategoriasModel.findAndCountAll(queryOptions);
        return categorias;
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        return null;
    }
};


CategoriasModel.consultarPorId = async (id) => {
    try {
        const categoria = await CategoriasModel.findByPk(id);
        if (!categoria) {
            throw new Error(`Categoria com ID ${id} não encontrado`);
        }
        return categoria;
    } catch (error) {
        console.error("Erro ao consultar categoria por ID:", error);
        return null;
    }
};

CategoriasModel.deletar = async (id) => {
    try {
        // Encontra o usuário pelo ID
        const categoria = await CategoriasModel.findByPk(id);

        // Verifica se o usuário foi encontrado
        if (!categoria) {
            throw new Error(`Categoria com ID ${id} não encontrado`);
        }

        // Deleta o usuário
        await categoria.destroy();
        return { message: `Categoria com ID ${id} deletado com sucesso` };
    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        return null;
    }
};



module.exports = CategoriasModel;