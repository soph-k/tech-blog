// Required NodeJS packages.
require('dotenv').config();
const Sequelize = require('sequelize');


// Using sequelize to create a connection to our database.
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
  });

// Exporting sequelize
module.exports = sequelize;
