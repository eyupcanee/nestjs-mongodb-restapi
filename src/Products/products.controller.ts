import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductResponseModel,
  ProductInsertResponseModel,
} from './product.model';
import { ObjectId } from 'mongoose';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post('add')
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ): Promise<ProductInsertResponseModel> {
    const response = await this.productService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );
    return response;
  }

  @Get()
  async getAllProducts(): Promise<ProductResponseModel> {
    const response = await this.productService.getAllProducts();
    return response;
  }

  @Get(':id')
  async getProduct(
    @Param('id') productId: ObjectId,
  ): Promise<ProductResponseModel> {
    const response = await this.productService.getProduct(productId);
    return response;
  }

  @Put('update/:id')
  async updateProduct(
    @Param('id') productId: ObjectId,
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ): Promise<ProductResponseModel> {
    const response = await this.productService.updateProduct(
      productId,
      productTitle,
      productDesc,
      productPrice,
    );

    return response;
  }
}
