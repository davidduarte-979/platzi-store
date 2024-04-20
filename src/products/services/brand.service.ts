import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepo.findOne(id, {
      relations: ['products'],
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newProduct = this.brandRepo.create(data);
    return this.brandRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const product = await this.brandRepo.findOne(id);
    this.brandRepo.merge(product, payload);
    return this.brandRepo.save(product);
  }

  remove(id: number) {
    return this.brandRepo.delete(id);
  }
}
