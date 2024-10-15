import { NextFunction, Request, Response } from "express";
import Image from "../model/imageModel";
import { statusCode } from "../types/types";

const getImages = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 40;
  const skip = (page - 1) * limit;

  const category = req.query.category as string | undefined;

  const filterCategories = req.query.categories
    ? (req.query.categories as string).split(",")
    : [];

  try {
    let query = {};

    if (category) {
      query = { categories: category };
    } else if (filterCategories.length > 0) {
      query = { categories: { $in: filterCategories } };
    }

    const images = await Image.find(query, {
      coco_url: 1,
      id: 1,
    })
      .skip(skip)
      .limit(limit);
    // console.log(images);
    if (!images) {
      res.status(statusCode.OK).json({
        success: false,
        message: "No images present",
      });
      return;
    }

    const updatedImages = images.map((image) => ({
      ...image.toObject(),
      coco_url: image.coco_url.replace(/^http:\/\//i, "https://"), // Replace HTTP with HTTPS
    }));
    // console.log(updatedImages);
    // console.log(images);
    res.status(statusCode.OK).json({
      success: true,
      message: "Images fetched",
      data: updatedImages,
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
