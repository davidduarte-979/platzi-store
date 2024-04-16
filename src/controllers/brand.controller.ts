import { Controller, Get } from '@nestjs/common';

@Controller('brand')
export class BrandController {
  @Get()
  getBrand() {
    return `GET BRAND`;
  }
}
