require('dotenv').config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db',
    process.env.DB_USER as string, 
    process.env.DB_PASSWORD as string, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: console.log
    }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successfully established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectDB };
export default sequelize;