import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'environments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        // eslint-disable-next-line prettier/prettier
        const request = http.get('https://jsonplaceholder.typicode.com/todos');

        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
