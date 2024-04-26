import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      db: process.env.DB_NAME,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      dbName: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      port: +process.env.MYSQL_PORT,
      host: process.env.MYSQL_HOST,
    },
    mongo: {
      dbUri: process.env.MONGO_DB_URI,
      dbName: process.env.MONGO_DB_NAME,
    },
    apiKey: process.env.API_KEY,
  };
});
