import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

class Habit extends Model {}

Habit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    goal: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Habit",
    tableName: "habits",
    timestamps: true,
  },
);

console.log(Habit === sequelize.models.Habit);

export default Habit;
