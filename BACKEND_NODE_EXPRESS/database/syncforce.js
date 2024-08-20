const connection = require('../config/connection');
require('../models/ProdutosModel');
require('../models/UsuarioModel');
require('../models/CategoriasModel');


connection.sync({ alter: true }); // Altera a tabela para refletir o novo modelo
