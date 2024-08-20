const { ProdutosModel } = require('../models/ProdutosModel');

class ProdutosController {
    async listar(req, res) {
        const { limit = 12, page = 1, fields = 'name,slug', match, category_ids, price_range, ...options } = req.query;

        try {
            const fieldsArray = fields.split(',').map(field => field.trim());

            const { rows: produtos, count } = await ProdutosModel.listar({
                limit: parseInt(limit, 10),
                page: parseInt(page, 10),
                fields: fieldsArray,
                match,
                category_ids,
                price_range,
                options
            });

            if (produtos.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Nenhum produto encontrado',
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    produtos,
                    total: count,
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao listar produtos',
                error: error.message
            });
        }
    }

    async consultarPorId(req, res) {
        const { id } = req.params;

        try {
            const produto = await ProdutosModel.consultarPorId(id);

            if (!produto) {
                return res.status(404).json({
                    success: false,
                    message: 'Produto não encontrado',
                });
            }

            return res.status(200).json({
                success: true,
                data: produto
            });
        } catch (error) {
            console.error("Erro ao consultar produto por ID:", error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao consultar produto',
                error: error.message
            });
        }
    }

    async criar(req, res) {
      try {
          // Chama o método 'criar' do modelo ProdutosModel, passando o corpo da requisição
          const produto = await ProdutosModel.criar(req.body);
  
          // Se a criação for bem-sucedida, retorna um status 201 com a informação do produto criado
          return res.status(201).json({
              success: true,
              data: produto
          });
      } catch (error) {
          // Se ocorrer um erro durante a criação, registra o erro e retorna um status 500
          console.error("Erro ao criar produto:", error);
          return res.status(500).json({
              success: false,
              message: 'Erro ao criar produto',
              error: error.message
          });
      }
  }
  

    async atualizar(req, res) {
        const { id } = req.params;

        try {
            const produto = await ProdutosModel.atualizar(id, req.body);

            if (!produto) {
                return res.status(404).json({
                    success: false,
                    message: 'Produto não encontrado',
                });
            }

            return res.status(200).json({
                success: true,
                data: produto
            });
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao atualizar produto',
                error: error.message
            });
        }
    }

    async deletar(req, res) {
        const { id } = req.params;

        try {
            const resultado = await ProdutosModel.deletar(id);

            if (!resultado) {
                return res.status(404).json({
                    success: false,
                    message: 'Produto não encontrado',
                });
            }

            return res.status(200).json({
                success: true,
                message: resultado.message
            });
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao deletar produto',
                error: error.message
            });
        }
    }
}

module.exports = new ProdutosController();
