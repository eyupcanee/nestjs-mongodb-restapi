import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseModel } from './product.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post('add')
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ): Promise<ProductResponseModel> {
    const response = await this.productService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );
    return response;
  }
}
