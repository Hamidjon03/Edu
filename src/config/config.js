const { Sequelize } = require('sequelize');
require('dotenv').config(); 
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,      
  process.env.DB_PASSWORD,  
  {
    host: process.env.DB_HOST,     
    port: process.env.DB_PORT,     
    dialect: 'postgres',           
    logging: false,                
  }
);

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL via Sequelize'))
  .catch(err => console.error('Connection to PostgreSQL failed:', err));

module.exports = sequelize;
