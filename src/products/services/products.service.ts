import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { BrandService } from './brand.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);

    if (payload.brandId) {
      const brand = await this.brandService.findOne(payload.brandId);
      product.brand = brand;
    }

    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
