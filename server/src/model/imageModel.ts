import mongoose, { Document, Schema } from "mongoose";

interface ICategory {
  category_name: string;
}

interface IImage extends Document {
  file_name: string;
  coco_url: string;
  height: number;
  width: number;
  date_captured: Date;
  flickr_url: string;
  id: number;
  categories: ICategory[];
}

const imageSchema = new Schema<IImage>({
  file_name: {
    type: String,
    required: true,
  },
  coco_url: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  date_captured: {
    type: Date,
    required: true,
  },
  flickr_url: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

const Image = mongoose.model<IImage>("Image", imageSchema);

export default Image;
