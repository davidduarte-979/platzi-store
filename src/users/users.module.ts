import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { UserController } from './controllers/user.controller';
import { ProductsModule } from 'src/products/products.module';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [CustomerController, UserController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
