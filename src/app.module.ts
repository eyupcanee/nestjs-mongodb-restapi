import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ProductsModule } from './Products/products.module';

dotenv.config({ path: './.env' });

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
