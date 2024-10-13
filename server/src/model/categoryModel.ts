import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  category_name: string;
  count: number;
}

const CategoryCountSchema = new Schema<ICategory>({
  category_name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model<ICategory>("Category", CategoryCountSchema);

export default Category;
