"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const imageRoute_1 = __importDefault(require("./routes/imageRoute"));
const categoryRouter_1 = __importDefault(require("./routes/categoryRouter"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/image", imageRoute_1.default);
app.use("/api/category", categoryRouter_1.default);
app.use(errorHandler_1.default);
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
    });
});
app.listen(PORT, () => {
    (0, connectDb_1.default)();
});
