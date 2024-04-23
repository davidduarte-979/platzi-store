import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  // findAll() {
  //   return this.orderRepo.find({ relations: ['customer'] });
  // }

  // async findOne(id: number) {
  //   const order = await this.orderRepo.findOne(id);
  //   if (!order) {
  //     throw new NotFoundException(`order ${id} not found`);
  //   }
  //   return order;
  // }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);
    const orderItem = new OrderItem();
    orderItem.product = product;
    orderItem.order = order;
    orderItem.quantity = data.quantity;
    return this.orderItemRepo.save(orderItem);
  }

  // async update(id: number, payload: UpdateOrderDto) {
  //   const order = await this.orderRepo.findOne(id);
  //   if (payload.customerId) {
  //     const customer = await this.customerRepo.findOne(payload.customerId);
  //     order.customer = customer;
  //   }
  //   return this.orderRepo.save(order);
  // }

  // delete(id: number) {
  //   return this.orderRepo.delete(id);
  // }
}
