import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    JwtModule.register({
      secret: 'thisissupersecret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, PassportModule, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
