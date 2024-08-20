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
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
            model: CategoriasModel, // Corrigido para o modelo Categoria
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'produto_categoria'
});


// Métodos customizados para ProdutosModel
ProdutosModel.criar = async (dadosProduto) => {
    const transaction = await connection.transaction();

    try {
        // Cria o produto
        const produto = await ProdutosModel.create(dadosProduto, { transaction });

        // Adiciona as categorias associadas
        if (dadosProduto.category_ids && dadosProduto.category_ids.length > 0) {
            const categories = await CategoriasModel.findAll({
                where: { id: dadosProduto.category_ids }
            });
            await produto.addCategorias(categories, { transaction });
        }

        // Adiciona as imagens associadas
        if (dadosProduto.images && dadosProduto.images.length > 0) {
            for (const image of dadosProduto.images) {
                await ImagensModel.create({
                    product_id: produto.id,
                    path: image.content,
                }, { transaction });
            }
        }

        // Adiciona as opções associadas
        if (dadosProduto.options && dadosProduto.options.length > 0) {
            for (const option of dadosProduto.options) {
                await OpcoesModel.create({
                    product_id: produto.id,
                    title: option.title,
                    shape: option.shape || 'square',
                    radius: option.radius || 0,
                    type: option.type || 'text',
                    values: option.values.join(','),
                }, { transaction });
            }
        }

        // Comita a transação
        await transaction.commit();
        return produto;
    } catch (error) {
        // Rollback da transação em caso de erro
        await transaction.rollback();
        console.error("Erro ao criar produto:", error);
        throw error;
    }
};


ProdutosModel.atualizar = async (id, atualizacoes) => {
    try {
        const produto = await ProdutosModel.findByPk(id);

        if (!produto) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }

        await produto.update(atualizacoes);
        return produto;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return null;
    }
};

ProdutosModel.listar = async (params) => {
    const { limit = 12, page = 1, fields = [], match, category_ids, price_range, options = {} } = params;

    try {
        const queryOptions = {
            attributes: fields.length ? fields : undefined,
            where: {},
            include: [
                {
                    model: ProdutoCategoriaModel,
                    attributes: ['category_id'],
                    where: category_ids ? { category_id: category_ids.split(',').map(id => parseInt(id)) } : undefined
                },
                {
                    model: ImagensModel,
                    attributes: ['id', 'path']
                },
                {
                    model: OpcoesModel,
                    attributes: ['id', 'title', 'values'],
                    where: Object.keys(options).length ? {
                        [Op.and]: Object.keys(options).map(optionId => ({
                            id: optionId,
                            values: {
                                [Op.in]: options[optionId].split(',')
                            }
                        }))
                    } : undefined
                }
            ],
            limit: limit === -1 ? undefined : limit,
            offset: limit === -1 ? undefined : (page - 1) * limit
        };

        if (match) {
            queryOptions.where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } }
            ];
        }

        if (price_range) {
            const [min, max] = price_range.split('-').map(value => parseFloat(value));
            queryOptions.where.price = {
                [Op.between]: [min, max]
            };
        }

        const produtos = await ProdutosModel.findAndCountAll(queryOptions);
        return produtos;
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        return null;
    }
};

ProdutosModel.consultarPorId = async (id) => {
    try {
        const produto = await ProdutosModel.findByPk(id, {
            include: [
                {
                    model: ProdutoCategoriaModel,
                    attributes: ['category_id']
                },
                {
                    model: ImagensModel,
                    attributes: ['id', 'path']
                },
                {
                    model: OpcoesModel,
                    attributes: ['id', 'title', 'values']
                }
            ]
        });

        if (!produto) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }

        return produto;
    } catch (error) {
        console.error("Erro ao consultar produto por ID:", error);
        return null;
    }
};

ProdutosModel.deletar = async (id) => {
    try {
        const produto = await ProdutosModel.findByPk(id);

        if (!produto) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }

        await produto.destroy();
        return { message: `Produto com ID ${id} deletado com sucesso` };
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        return null;
    }
};


// Definição de associações
ProdutosModel.belongsToMany(CategoriasModel, { 
    through: ProdutoCategoriaModel, 
    foreignKey: 'product_id' ,
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
