import express, { Router } from "express";
import { getImages } from "../controllers/imageController";

const imageRouter: Router = express.Router();

// imageRouter.post("/");
imageRouter.get("/", getImages);

export default imageRouter;
