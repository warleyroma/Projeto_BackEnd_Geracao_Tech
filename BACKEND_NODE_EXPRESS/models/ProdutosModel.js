/*const { Sequelize } = require('sequelize');*/
const connection = require('../config/connection');
const { DataTypes } = require("sequelize");


const ProdutosModel = connection.define("produto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Valor padrão 0
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Valor padrão 0
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0 // Valor padrão 0
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'produto'
});




ProdutosModel.criar = async (name, slug, use_in_menu) => {
    try {
        const produto = await ProdutosModel.create({ name, slug, use_in_menu });
        return produto;
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        throw error; // Lance o erro para ser tratado no controller
    }
};

ProdutosModel.atualizar = async (id, atualizacoes) => {
    try {
      // Encontra a categoria pelo ID
      const produto = await ProdutosModel.findByPk(id);
  
      // Verifica se a categoria foi encontrada
      if (!categoria) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
      }
  
      // Atualiza os dados da categoria com as novas informações
      await produto.update(atualizacoes);
  
      return produto; // Retorna a categoria atualizada
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      return null;
    }
  };
  



  ProdutosModel.listar = async ({ limit = 12, page = 1, fields = [], use_in_menu } = {}) => {
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

        const produtos = await ProdutosModel.findAndCountAll(queryOptions);
        return produtos;
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        return null;
    }
};


ProdutosModel.consultarPorId = async (id) => {
    try {
        const produto = await ProdutosModel.findByPk(id);
        if (!produto) {
            throw new Error(`Categoria com ID ${id} não encontrado`);
        }
        return produto;
    } catch (error) {
        console.error("Erro ao consultar categoria por ID:", error);
        return null;
    }
};

ProdutosModel.deletar = async (id) => {
    try {
        // Encontra o usuário pelo ID
        const produto = await ProdutosModel.findByPk(id);

        // Verifica se o usuário foi encontrado
        if (!produto) {
            throw new Error(`Categoria com ID ${id} não encontrado`);
        }

        // Deleta o usuário
        await produto.destroy();
        return { message: `Categoria com ID ${id} deletado com sucesso` };
    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        return null;
    }
};



module.exports = ProdutosModel;