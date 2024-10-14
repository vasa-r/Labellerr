import express, { Router } from "express";
import { getImage, getImages } from "../controllers/imageController";

const imageRouter: Router = express.Router();

// imageRouter.post("/");
imageRouter.get("/", getImages);
imageRouter.get("/:id", getImage);

export default imageRouter;
