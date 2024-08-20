const { DataTypes, Op } = require("sequelize");
const connection = require('../config/connection');
const CategoriasModel = require('./CategoriasModel');

// Definindo o modelo de Produtos
const ProdutosModel = connection.define("produto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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

// Definindo o modelo de Imagens
const ImagensModel = connection.define("imagem_produto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ProdutosModel,
            key: 'id'
        },
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'imagem_produto'
});

// Definindo o modelo de Opções
const OpcoesModel = connection.define("opcao_produto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProdutosModel,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        defaultValue: 'square'
    },
    radius: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text'
    },
    values: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'opcao_produto'
});

// Definindo o modelo de CategoriaProduto
const ProdutoCategoriaModel = connection.define("produto_categoria", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProdutosModel,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CategoriasModel,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'produto_categoria'
});

// Associações
ProdutosModel.belongsToMany(CategoriasModel, { 
    through: ProdutoCategoriaModel, 
    foreignKey: 'product_id',
    otherKey: 'category_id'
});

CategoriasModel.belongsToMany(ProdutosModel, { 
    through: ProdutoCategoriaModel, 
    foreignKey: 'category_id',
    otherKey: 'product_id'
});

ProdutosModel.hasMany(ImagensModel, { 
    foreignKey: 'product_id'
});

ProdutosModel.hasMany(OpcoesModel, { 
    foreignKey: 'product_id'
});

ProdutoCategoriaModel.belongsTo(ProdutosModel, { 
    foreignKey: 'product_id'
});

ProdutoCategoriaModel.belongsTo(CategoriasModel, { 
    foreignKey: 'category_id'
});

module.exports = { ProdutosModel, ImagensModel, OpcoesModel, ProdutoCategoriaModel };
