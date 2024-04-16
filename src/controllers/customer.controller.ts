import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  @Get()
  getBrand() {
    return `GET CUSTOMER`;
  }
}
