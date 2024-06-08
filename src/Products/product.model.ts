import { Date, Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
  },
  { timestamps: true },
);

export interface Product extends Document {
  _id: string;
  title: string;
  description: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProductResponseModel extends Product {
  message: string;
}
