import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Index()
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'int' })
  stock: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];
}
