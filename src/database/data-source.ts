import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_DB_URL,
  synchronize: false,
  logging: false,
  entities: ['/src/**/*.entity.ts'],
  migrations: ['/src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

// new comit
