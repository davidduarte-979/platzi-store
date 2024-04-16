import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategories(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ) {
    return `Product ${productId} category ${id}`;
  }
}
