import express, { Request, Response } from "express";
import habitController from "./controllers/habitController";
import habitRoutes from "./routes/habitRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", habitController.getHome);

app.use("/api/habits", habitRoutes);

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
