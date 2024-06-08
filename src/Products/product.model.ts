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
  price: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProductResponseModel {
  message: string;
  products: Product | Product[];
}

export interface ProductInsertResponseModel extends Product {
  message: string;
}

export interface ProductBulkResponseModel {
  message: string;
  products: Product[];
}
