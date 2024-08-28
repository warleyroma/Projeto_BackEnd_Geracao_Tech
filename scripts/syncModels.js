// syncDatabase.js
const connection = require('../config/connection');

/*async function syncModels() {
  try {
    // Drop tables that depend on 'produto' first
    await connection.getQueryInterface().dropTable('produto_categoria');
    await connection.getQueryInterface().dropTable('imagem_produto');
    await connection.getQueryInterface().dropTable('opcao_produto');

    // Now drop the 'produto' table
    await connection.getQueryInterface().dropTable('produto');

    // Recreate tables if necessary
    await connection.sync({ force: true });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}*/
async function syncModels() {
  try {
    await connection.sync({ force: true });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}

syncModels();
