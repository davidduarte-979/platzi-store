import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from 'src/products/services/products.service';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const product = await this.userRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(data: CreateUserDto) {
    const newProduct = this.userRepo.create(data);
    return this.userRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateUserDto) {
    const product = await this.userRepo.findOne(id);
    this.userRepo.merge(product, payload);
    return this.userRepo.save(product);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUsers(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productService.findAll(),
    };
  }
}
