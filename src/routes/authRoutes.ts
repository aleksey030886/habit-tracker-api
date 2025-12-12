import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

export default router;