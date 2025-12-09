import Habit from "../models/Habit";

class HabitService {
  async getAllHabits() {
    return await Habit.findAll();
  }

  async getHabitById(id: number) {
    return await Habit.findByPk(id);
  }

  async createHabit(habitData: {
    title: string;
    description?: string;
    goal?: number;
  }) {
    return await Habit.create({
      title: habitData.title.trim(),
      description: habitData.description?.trim(),
      goal: habitData.goal || 1,
    });
  }

  async updateHabit(
    id: number,
    updateData: {
      title?: string;
      description?: string;
      goal?: number;
    },
  ) {
    const habit = await Habit.findByPk(id);
    if (!habit) return null;

    return await habit.update(updateData);
  }

  async deleteHabit(id: number) {
    const habit = await Habit.findByPk(id);
    if (!habit) return null;

    await habit.destroy();
    return { message: "Habit deleted" };
  }
}

export default new HabitService();
