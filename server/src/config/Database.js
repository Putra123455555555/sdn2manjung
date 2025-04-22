import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

const db = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'sdn2manjung_db',
  logging: process.env.DB_LOGGING === 'console.log', 
});

export default db;
