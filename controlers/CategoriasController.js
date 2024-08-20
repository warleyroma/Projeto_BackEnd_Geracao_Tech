const CategoriasModel = require('../models/CategoriasModel');
const { validarToken } = require('../middlewares/auth');

class CategoriasController {
    async listar(req, res) {
        const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;
      
        try {
          // Converte os campos em um array
          const fieldsArray = fields.split(',').map(field => field.trim());
      
          // Chama o método listar com os parâmetros fornecidos
          const { rows: categorias, count } = await CategoriasModel.listar({
            limit: parseInt(limit, 10),
            page: parseInt(page, 10),
            fields: fieldsArray,
            use_in_menu
          });
      
          // Prepara a resposta
          res.status(200).json({
            data: categorias,
            total: count,
            limit: parseInt(limit, 10),
            page: parseInt(page, 10)
          });
        } catch (err) {
          res.status(500).json({ message: 'Erro ao listar categorias', error: err.message });
        }
      }
      

  async consultarPorId(req, res) {
    const { id } = req.params;
    try {
      const categorias = await CategoriasModel.consultarPorId(id);
      if (!categorias) {
        return res.status(404).json({ message: `Categoria com ID ${id} não encontrado` });
      }
      res.status(200).json(categorias);

    } catch (err) {
      res.status(500).json({  requestHeaders: headers , message: 'Erro ao consultar categoria', error: err.message });
    }
  }
  

  async criar(req, res) {
    const { name, slug, use_in_menu } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!name || !slug) {
        return res.status(400).json({ message: 'Nome e slug são obrigatórios' });
    }

    try {
        // Cria a nova categoria usando o modelo
        const categoria = await CategoriasModel.criar(name, slug, use_in_menu);

        // Retorna uma resposta de sucesso com a categoria criada
        res.status(201).json({ 
            message: 'Categoria criada com sucesso', 
            categoria: categoria 
        });
    } catch (err) {
        // Retorna uma resposta de erro com a mensagem do erro
        res.status(500).json({ 
            message: 'Erro ao criar categoria', 
            error: err.message 
        });
    }
}



async atualizar(req, res) {
    const { id } = req.params;
    const atualizacoes = req.body;
    
    try {
      const categoriaAtualizada = await CategoriasModel.atualizar(id, atualizacoes);
      
      if (categoriaAtualizada === null) {
        return res.status(404).json({ message: `Categoria com ID ${id} não encontrada` });
      }
      
      res.status(200).json({ message: 'Categoria atualizada com sucesso', categoria: categoriaAtualizada });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar categoria', error: err.message });
    }
  }
  


  async deletar(req, res) {
    const { id } = req.params;
    
    try {
      const resultado = await CategoriasModel.deletar(id);
      
      if (resultado === null) {
        return res.status(500).json({ message: 'Erro ao deletar categoria' });
      }
      
      res.status(200).json(resultado);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar categoria', error: err.message });
    }
  }
  
}

module.exports = CategoriasController;