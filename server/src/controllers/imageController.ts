import { NextFunction, Request, Response } from "express";
import Image from "../model/imageModel";
import { statusCode } from "../types/types";

const getImages = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 40;
  const skip = (page - 1) * limit;

  const filterCategories = req.query.categories
    ? (req.query.categories as string).split(",")
    : [];

  try {
    const query =
      filterCategories.length > 0
        ? { categories: { $in: filterCategories } }
        : {};

    const images = await Image.find(query, {
      coco_url: 1,
      id: 1,
    })
      .skip(skip)
      .limit(limit);
    if (!images) {
      res.status(statusCode.OK).json({
        success: false,
        message: "No images present",
      });
      return;
    }
    res.status(statusCode.OK).json({
      success: true,
      message: "Images fetched",
      data: images,
      length: images.length,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getImage = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const image = await Image.find({ id: id });
    if (!image) {
      res.status(statusCode.OK).json({
        success: false,
        message: "No images present",
      });
      return;
    }
    res.status(statusCode.OK).json({
      success: true,
      message: "Images fetched",
      data: image,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getImages, getImage };
