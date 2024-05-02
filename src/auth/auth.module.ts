import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/services/users.service';
import { CustomersService } from 'src/users/services/customers.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: async (configiService: ConfigType<typeof config>) => {
        return {
          secret: configiService.jwtSecret,
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
    UsersModule,
    ProductsModule,
  ],
  providers: [AuthService, PassportModule, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
