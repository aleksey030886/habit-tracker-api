import User from "./User";
import Habit from "./Habit";

User.hasMany(Habit, {
  foreignKey: "userId",
  as: "habits",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Habit.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { User, Habit };
