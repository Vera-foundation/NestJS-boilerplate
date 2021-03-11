import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './auth/auth.module';
import { UserModule } from './components/user/user.module';
import configuration from './config/configuration';
import { validate } from './env.validation';
import { User } from './components/user/user.entity';
import { AppLoggerMiddleware } from './middlewares/logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            expandVariables: true,
            envFilePath: `env/.env.${process.env.NODE_ENV}`,
            load: [configuration],
            validate
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_CONFIG.HOST'),
                port: configService.get<number>('DATABASE_CONFIG.PORT'),
                username: configService.get<string>('DATABASE_CONFIG.USERNAME'),
                password: configService.get<string>('DATABASE_CONFIG.PASSWORD'),
                database: configService.get<string>('DATABASE_CONFIG.DATABASE'),
                entities: [User],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        AuthenticationModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
