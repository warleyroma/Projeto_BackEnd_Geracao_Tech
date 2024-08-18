const { Sequelize, DataTypes } = require ("sequelize");

const connection = new Sequelize({
    dialect: 'mysql', 
    database:"db_loja",
    host: "localhost",
    username: "root",
    password: "root",
    port:"3306"
});

module.exports = connection
 /*
connection.define("Teste", {
    coluna_teste: DataTypes.STRING
});

connection.sync();
*/
