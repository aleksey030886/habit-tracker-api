import sequelize from './config/database';
import Habit from './models/Habit';

async function initDatabase() {
  try {
    await sequelize.sync({force: true});
    console.log('Ok');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}


initDatabase();