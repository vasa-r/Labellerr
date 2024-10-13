import express, { Router } from "express";
import { getCategory } from "../controllers/categoryController";

const categoryRouter: Router = express.Router();

// categoryRouter.post("/");
categoryRouter.get("/", getCategory);

export default categoryRouter;
