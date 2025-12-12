import express, { Request, Response } from "express";
import habitController from "./controllers/habitController";
import habitRoutes from "./routes/habitRoutes";
import authRoutes from "./routes/authRoutes";
import { User } from "./models";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", habitController.getHome);

app.use("/api/habits", habitRoutes);

app.use("/api/auth", authRoutes);

app.get("/api/test/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json('error: message' );
  }
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
