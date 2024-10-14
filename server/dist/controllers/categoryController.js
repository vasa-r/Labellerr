"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = void 0;
const types_1 = require("../types/types");
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filterCategories = req.query.categories
        ? req.query.categories.split(",")
        : [];
    try {
        const query = filterCategories.length > 0
            ? { category_name: { $in: filterCategories } }
            : {};
        const categories = yield categoryModel_1.default.find(query).skip(skip).limit(limit);
        if (!categories) {
            res.status(types_1.statusCode.OK).json({
                success: false,
                message: "No category present",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Categories fetched",
            data: categories,
            length: categories.length,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getCategory = getCategory;
