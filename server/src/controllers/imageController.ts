import { NextFunction, Request, Response } from "express";
import Image from "../model/imageModel";
import { statusCode } from "../types/types";

const getImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await Image.find().limit(10);
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

export { getImages };
