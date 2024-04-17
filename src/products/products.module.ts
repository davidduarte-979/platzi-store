import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { OrdersService } from './services/orders.service';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
import { OrdersController } from './controllers/orders.controller';

@Module({
  controllers: [
    ProductsController,
    CategoriesController,
    BrandController,
    OrdersController,
  ],
  providers: [ProductsService, CategoriesService, OrdersService, BrandService],
  exports: [ProductsService],
})
export class ProductsModule {}
