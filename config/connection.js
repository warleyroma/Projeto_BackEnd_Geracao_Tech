const { Sequelize } = require("sequelize");

let connection;

const dbConfig = {
  mysql: {
    dialect: 'mysql',
    database: "db_loja",
    host: "localhost",
    username: "root",
    password: "root",
    port: "3306"
  },
  postgres: {
    dialect: 'postgres',
    database: 'db_loja_f4ze',
    host: 'dpg-cr4d9elsvqrc73aup03g-a.oregon-postgres.render.com',
    username: 'db_loja_f4ze_user',
    password: 'mQVHlu8ChCeQv9ow4cqeIF1AgHjoeQRS',
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

const dbType = 'mysql'; // ou 'mysql' ou 'postgres'

connection = new Sequelize(dbConfig[dbType]);

// testando conexão
async function testConnection() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

//testConnection();

connection.sync({ force: true });

module.exports = connection;