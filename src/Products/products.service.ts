import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  Product,
  ProductInsertResponseModel,
  ProductResponseModel,
} from './product.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<ProductInsertResponseModel> {
    const newProduct = new this.productModel({
      title: title,
      description: description,
      price: price,
    });
    const result = await newProduct.save();
    const msg = 'Product has been inserted.';
    return {
      message: msg,
      ...result,
    };
  }

  async getAllProducts(): Promise<ProductResponseModel> {
    const products = await this.productModel.find();
    if (products.length > 0) {
      const msg = 'Here all of the products.';
      return { message: msg, products: products };
    } else {
      const msg = "There isn't any product";
      return { message: msg, products: products };
    }
  }

  async getProduct(id: ObjectId): Promise<ProductResponseModel> {
    const product = await this.productModel.findById(id);

    if (product) {
      const msg = 'Here is your product.';
      return { message: msg, products: product };
    } else {
      const msg = "There isn't any product.";
      return { message: msg, products: product };
    }
  }

  async updateProduct(
    id: ObjectId,
    productTitle: string,
    productDesc: string,
    productPrice: number,
  ): Promise<ProductResponseModel> {
    try {
      const updateFields = {};
      if (productTitle) updateFields['title'] = productTitle;
      if (productDesc) updateFields['description'] = productDesc;
      if (productPrice) updateFields['price'] = productPrice;

      const response = await this.productModel.findByIdAndUpdate(
        id,
        updateFields,
        { new: true },
      );
      if (response) {
        const msg = 'Product has been updated successfully!';
        return {
          message: msg,
          products: response,
        };
      } else {
        throw new NotFoundException("There isn't product with that id.");
      }
    } catch (error) {
      throw new Error('General error.');
    }
  }
}
