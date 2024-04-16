import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [CustomerController, UserController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
