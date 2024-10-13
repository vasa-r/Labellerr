import { NextFunction, Request, Response } from "express";
import { statusCode } from "../types/types";
import Category from "../model/categoryModel";

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find().limit(20);
    if (!categories) {
      res.status(statusCode.OK).json({
        success: false,
        message: "No category present",
      });
      return;
    }
    res.status(statusCode.OK).json({
      success: true,
      message: "Categories fetched",
      data: categories,
      length: categories.length,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getCategory };
