import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandController } from './controllers/brand.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { OrdersService } from './services/orders.service';
import { BrandService } from './services/brand.service';
import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
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
