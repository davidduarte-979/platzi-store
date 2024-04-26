import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const product = await this.customerRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(data: CreateCustomerDto) {
    const newProduct = this.customerRepo.create(data);
    return this.customerRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const product = await this.customerRepo.findOne({ where: { id } });
    this.customerRepo.merge(product, payload);
    return this.customerRepo.save(product);
  }

  delete(id: number) {
    return this.customerRepo.delete(id);
  }
}
