import { NextFunction, Request, Response } from "express";
import { statusCode } from "../types/types";
import Category from "../model/categoryModel";

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const filterCategories = req.query.categories
    ? (req.query.categories as string).split(",")
    : [];
  try {
    const query =
      filterCategories.length > 0
        ? { category_name: { $in: filterCategories } }
        : {};

    const categories = await Category.find(query).skip(skip).limit(limit);
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
