const connection = require('../config/connection');
require('../models/ProdutosModel');
require('../models/UsuarioModel');
require('../models/CategoriasModel');


connection.sync({ force: true }); // Altera a tabela para refletir o novo modelo
