import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const product = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(data: CreateCategoryDto) {
    const newProduct = this.categoryRepo.create(data);
    // if (data.brandId) {
    //   const brand = await this.brandService.findOne(data.brandId);
    //   newProduct.brand = brand;
    // }
    return this.categoryRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const product = await this.categoryRepo.findOne({ where: { id } });

    this.categoryRepo.merge(product, payload);
    return this.categoryRepo.save(product);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
