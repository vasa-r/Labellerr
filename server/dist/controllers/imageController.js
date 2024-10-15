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
exports.getImage = exports.getImages = void 0;
const imageModel_1 = __importDefault(require("../model/imageModel"));
const types_1 = require("../types/types");
const getImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 40;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const filterCategories = req.query.categories
        ? req.query.categories.split(",")
        : [];
    try {
        let query = {};
        if (category) {
            query = { categories: category };
        }
        else if (filterCategories.length > 0) {
            query = { categories: { $in: filterCategories } };
        }
        const images = yield imageModel_1.default.find(query, {
            coco_url: 1,
            id: 1,
        })
            .skip(skip)
            .limit(limit);
        // console.log(images);
        if (!images) {
            res.status(types_1.statusCode.OK).json({
                success: false,
                message: "No images present",
            });
            return;
        }
        const updatedImages = images.map((image) => (Object.assign(Object.assign({}, image.toObject()), { coco_url: image.coco_url.replace(/^http:\/\//i, "https://") })));
        // console.log(updatedImages);
        // console.log(images);
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Images fetched",
            data: updatedImages,
            length: images.length,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getImages = getImages;
const getImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const image = yield imageModel_1.default.find({ id: id });
        if (!image) {
            res.status(types_1.statusCode.OK).json({
                success: false,
                message: "No images present",
            });
            return;
        }
        const updatedImage = image.map((item) => (Object.assign(Object.assign({}, item.toObject()), { coco_url: item.coco_url.replace(/^http:\/\//i, "https://") })));
        // console.log(updatedImage);
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Images fetched",
            data: updatedImage,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getImage = getImage;
