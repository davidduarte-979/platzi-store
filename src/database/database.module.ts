import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

const API_KEY = '12345';
const API_KEY_PROD = 'PROD12345';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     const { user, host, dbName, password, port } = configService.postgres;
    //     return {
    //       type: 'postgres',
    //       username: user,
    //       host,
    //       database: dbName,
    //       password,
    //       port,
    //       synchronize: false,
    //       autoLoadEntities: true,
    //     };
    //   },
    //   inject: [config.KEY],
    // }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        return {
          uri: configService.mongo.dbUri,
          dbName: configService.mongo.dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          user: configService.postgres.user,
          host: configService.postgres.host,
          database: configService.postgres.dbName,
          password: configService.postgres.password,
          port: configService.postgres.port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const client = new MongoClient(configService.mongo.dbUri);
        await client.connect();
        return client.db('demo');
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
