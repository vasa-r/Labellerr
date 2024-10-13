import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb";
import errorHandler from "./middleware/errorHandler";
import imageRouter from "./routes/imageRoute";
import categoryRouter from "./routes/categoryRouter";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/image", imageRouter);
app.use("/api/category", categoryRouter);

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.listen(PORT, () => {
  connectDb();
});
