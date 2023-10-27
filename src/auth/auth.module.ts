import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    inject: [config.KEY],
    useFactory: (configService: ConfigType<typeof config>) => {
      return {
        secret: configService.jwt_secret,
        signOptions: {
          expiresIn: '1d'
        }
      }
    }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
