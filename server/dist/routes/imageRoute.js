"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const imageRouter = express_1.default.Router();
// imageRouter.post("/");
imageRouter.get("/", imageController_1.getImages);
imageRouter.get("/:id", imageController_1.getImage);
exports.default = imageRouter;
