import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductResponseModel } from './product.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<ProductResponseModel> {
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
}
