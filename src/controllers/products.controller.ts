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
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('filter')
  getProductFilter() {
    return { message: `products filter 1` };
  }

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    // using express
    // response.status(200).send({
    //   message: `Product ${productId}`,
    // });
    const product = this.productService.findOne(+productId);
    return product;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: any) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id') id: number) {
    return this.productService.delete(+id);
  }
}
