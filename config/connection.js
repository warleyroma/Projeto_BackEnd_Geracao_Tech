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

const dbType = 'postgres'; // ou 'mysql' ou 'postgres'

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

/*async function listTables() {
    try {
      let query;
      if (dbType === 'mysql') {
        query = 'SHOW TABLES';
      } else if (dbType === 'postgres') {
        query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";
      } else {
        throw new Error('Unsupported database type');
      }
  
      const [results] = await connection.query(query);
      console.log('Tables:', results);
    } catch (error) {
      console.error('Error listing tables:', error);
    }
  }


async function executeQuery() {
    try {
      const [results, metadata] = await connection.query('SELECT * FROM users');
      console.log('Results:', results);
      console.log('Metadata:', metadata);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  }


testConnection();
listTables();

executeQuery();
*/
async function listTables() {
    try {
      let query;
      if (dbType === 'mysql') {
        query = 'SHOW TABLES';
      } else if (dbType === 'postgres') {
        query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";
      } else {
        throw new Error('Unsupported database type');
      }
  
      const [results] = await connection.query(query);
      console.log('Tables:', results);
    } catch (error) {
      console.error('Error listing tables:', error);
    }
  }
testConnection();
listTables();


connection.sync({ force: true });

module.exports = connection;