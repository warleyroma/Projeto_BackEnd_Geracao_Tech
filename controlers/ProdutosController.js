const { ProdutosModel, ImagensModel, OpcoesModel, ProdutoCategoriaModel } = require('../models/ProdutosModel');
const CategoriasModel = require('../models/CategoriasModel');
const { validarToken } = require('../middlewares/auth');

// Listar produtos
const listar = async (req, res) => {
    const { limit = 12, page = 1, fields = [], match, category_ids, price_range, ...options } = req.query;

    try {
        const queryOptions = {
            attributes: fields.length ? fields.split(',') : undefined,
            where: {},
            include: [
                {
                    model: CategoriasModel,
                    attributes: ['id', 'name'], // Ajuste para incluir a categoria diretamente
                    through: {
                        attributes: ['category_id'], 
                        where: category_ids ? { category_id: category_ids.split(',').map(id => parseInt(id)) } : undefined
                    }
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
            limit: limit === '-1' ? undefined : parseInt(limit),
            offset: limit === '-1' ? undefined : (page - 1) * parseInt(limit)
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

        const { count, rows } = await ProdutosModel.findAndCountAll(queryOptions);
        res.json({ data: rows, total: count, limit: parseInt(limit), page: parseInt(page) });
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.status(400).json({ message: "Erro ao listar produtos" });
    }
};

// Obter produto por ID
const consultarPorId = async (req, res) => {
    const { id } = req.params;
    console.log(`Consultando produto com ID: ${id}`);

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

        console.log('Produto encontrado:', produto);

        if (!produto) {
            return res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
        }

        res.json(produto);
    } catch (error) {
        console.error("Erro ao obter produto por ID:", error);
        res.status(400).json({ message: "Erro ao obter produto por ID" });
    }
};

// Criar produto
const criar = async (req, res) => {
    const dadosProduto = req.body;

    try {
        const produto = await ProdutosModel.create(dadosProduto);
        res.status(201).json(produto);
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(400).json({ message: "Erro ao criar produto" });
    }
};

// Atualizar produto
const atualizar = async (req, res) => {
    const { id } = req.params;
    const atualizacoes = req.body;

    try {
        const produto = await ProdutosModel.findByPk(id);

        if (!produto) {
            return res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
        }

        await produto.update(atualizacoes);
        res.status(200).json({ message: 'Produto atualizado com sucesso', produto });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(400).json({ message: "Erro ao atualizar produto" });
    }
};

// Deletar produto
const deletar = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await ProdutosModel.findByPk(id);

        if (!produto) {
            return res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
        }

        await produto.destroy();
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(400).json({ message: "Erro ao deletar produto" });
    }
};

module.exports = {
    listar,
    consultarPorId,
    criar,
    atualizar,
    deletar
};
