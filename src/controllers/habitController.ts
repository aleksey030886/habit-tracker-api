import { Request, Response } from "express";
import HabitService from "../services/habitService";

class HabitController {
  async getHome(req: Request, res: Response) {
    try {
      res.json({
        message: "Habit Tracker API",
        version: "1.0.0",
        endpoints: [
          "GET    /api/habits       - get habit",
          "GET    /api/habits/:id   - get habit ID",
          "POST   /api/habits       - greate new habit",
          "PUT    /api/habits/:id   - update habit",
          "DELETE /api/habits/:id   - delete habit",
        ],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const habits = await HabitService.getAllHabits();
      res.json(habits);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const habit = await HabitService.getHabitById(id);
      if (!habit) {
        return res.status(404).json({
          success: false,
          error: "Habit not found",
        });
      }
      res.json({
        success: true,
        data: habit,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error Habits",
      });
    }
  }

  async createHabit(req: Request, res: Response) {
    try {
      if (!req.body.title || req.body.title.trim() === "") {
        return res.status(400).json({
          success: false,
          error: "Habit name required",
        });
      }

      const newHabit = await HabitService.createHabit({
        title: req.body.title.trim(),
        description: req.body.description?.trim(),
        goal: req.body.goal || 1,
        userId: req.body.userId,
      });

      res.status(201).json({
        success: true,
        data: newHabit,
      });
    } catch (error) {
      console.error("Error create habit", error);
      res.status(500).json({
        success: false,
        error: "failed create habit",
      });
    }
  }

  async updateHabit(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const habit = await HabitService.getHabitById(id);

      if (!habit) {
        return res.status(404).json({
          success: false,
          error: "Id not found",
        });
      }

      if (!req.body.title || req.body.title.trim() === "") {
        return res.status(400).json({
          success: false,
          error: "Habit title requred",
        });
      }

      const updateHabit = await HabitService.updateHabit(id, {
        title: req.body.title.trim(),
        description: req.body.description?.trim(),
        goal: req.body.goal || 1,
      });

      res.status(200).json({
        success: true,
        data: updateHabit,
      });
    } catch (error) {
      console.error("Error update habit", error);
      res.status(500).json({
        success: false,
        error: "failed update habit",
      });
    }
  }

  async deleteHabit(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const habit = await HabitService.getHabitById(id);

      if (!habit) {
        return res.status(404).json({
          success: false,
          error: "Id not found",
        });
      }

      await HabitService.deleteHabit(id);

      res.status(200).json({
        success: true,
        message: "Habit delete",
      });
    } catch (error) {
      console.error("Error delete habit", error);
      res.status(500).json({
        success: false,
        error: "failed delete habit",
      });
    }
  }
}
export default new HabitController();
