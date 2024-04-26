import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindConditions } from 'typeorm';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product.toObject();
  }

  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, changes: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  // async removeCategoryByProduct(productId: number, categoryId: number) {
  //   const product = await this.productRepo.findOne(productId, {
  //     relations: ['categories'],
  //   });
  //   product.categories = product.categories.filter(
  //     (category) => category.id !== categoryId,
  //   );
  //   return this.productRepo.save(product);
  // }

  // async addCategoryByProduct(productId: number, categoryId: number) {
  //   const product = await this.productRepo.findOne(productId, {
  //     relations: ['categories'],
  //   });

  //   const category = await this.categoryRepo.findOne(categoryId);

  //   product.categories.push(category);

  //   return this.productRepo.save(product);
  // }
}
