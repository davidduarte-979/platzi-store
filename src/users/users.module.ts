import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { UserController } from './controllers/user.controller';
import { ProductsModule } from 'src/products/products.module';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [
    CustomerController,
    UserController,
    OrdersController,
    OrderItemController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
  exports: [UsersService, CustomersService],
})
export class UsersModule {}
