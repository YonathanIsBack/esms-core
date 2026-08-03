import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './AuthMiddleware';
import { UserController } from './UserController';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';
import { User } from './model/User.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/exception/HttpExceptionFilter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/login', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
