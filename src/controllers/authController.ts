import { Request, Response } from "express";
import UserService from "../services/userService";
import jwt from "jsonwebtoken";

class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          error: "All fields are required: email, password, name",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
      }

      if (await UserService.getUserByEmail(email)) {
        return res.status(400).json({
          success: false,
          error: "Email already exists",
        });
      }

      const newUser = await UserService.registerUser({
        email: email.toLowerCase().trim(),
        password,
        name: name.trim(),
      });

      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
        },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" },
      );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          newUser: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            createdAt: newUser.createdAt,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: "Email and password are required",
        });
      }

      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      const isValidPassword = await UserService.validatePassword(
        user,
        password,
      );
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" },
      );

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        message: "Successfully logged out (client should discard token)",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error during logout",
      });
    }
  }
}

export default new AuthController();
