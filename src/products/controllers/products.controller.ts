import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  // Res,
} from '@nestjs/common';
// import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from 'src/products/services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('filter')
  getProductFilter() {
    return { message: `products filter 1` };
  }

  @Get()
  @ApiOperation({ summary: 'List of Products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    const product = this.productService.findOne(productId);
    return product;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.remove(id);
  }

  // @Delete(':id/category/:categoryId')
  // @HttpCode(HttpStatus.ACCEPTED)
  // deleteCategory(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Param('categoryId', ParseIntPipe) categoryId: number,
  // ) {
  //   return this.productService.removeCategoryByProduct(id, categoryId);
  // }

  // @Put(':id/category/:categoryId')
  // @HttpCode(HttpStatus.ACCEPTED)
  // addCategoryToProduct(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Param('categoryId', ParseIntPipe) categoryId: number,
  // ) {
  //   return this.productService.addCategoryByProduct(id, categoryId);
  // }
}
