const connection = require('../config/connection');
require('../models/UsuarioModel');
require('../models/CategoriasModel');

connection.sync({force:true});