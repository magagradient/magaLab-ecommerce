require('dotenv').config(); // Cargar las variables de entorno desde el .env

module.exports = {
  development: {
    username: process.env.DBUSER || 'root',  // Usar la variable DBUSER del .env
    password: process.env.PASSWORD || '',   // Usar la variable PASSWORD del .env
    database: process.env.DATABASE || 'ecommerce_magalab',  // Usar la variable DATABASE del .env
    host: process.env.HOST || 'localhost',  // Usar la variable HOST del .env
    dialect: 'mysql',
  },
  test: {
    username: process.env.DBUSER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'ecommerce_magalab',
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DBUSER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'ecommerce_magalab',
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
  }
};
