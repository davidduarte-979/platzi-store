import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find();
  }

  async findOne(id: string) {
    return this.customerModel.findById(id);
  }

  async create(data: CreateCustomerDto) {
    const newModel = new this.customerModel(data);
    const model = await newModel.save();
    return model.toJSON();
  }

  update(id: string, changes: UpdateCustomerDto) {
    return this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
