const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'yeha_tours',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    if (error.parent && error.parent.code === 'ECONNREFUSED') {
      console.error('   Connection refused. Check:');
      console.error('   - Is the database server running?');
      console.error('   - Are DB_HOST, DB_USER, DB_PASSWORD, DB_NAME set correctly?');
      console.error('   - Can your service reach the database host?');
    }
    throw error; // Re-throw so server startup fails if DB is required
  }
};

module.exports = { sequelize, testConnection };

