import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      db: process.env.DB_NAME,
      name: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
  };
});
