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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);

    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);

    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      product.categories = categories;
    }

    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });

    const category = await this.categoryRepo.findOne(categoryId);

    product.categories.push(category);

    return this.productRepo.save(product);
  }
}
