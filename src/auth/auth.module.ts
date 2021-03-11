import { Module } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { AuthenticationController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/components/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH.JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('AUTH.JWT_EXPIRATION_TIME')
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [
    PassportModule,
    JwtModule
  ],
  controllers: [AuthenticationController]
})

export class AuthenticationModule { }