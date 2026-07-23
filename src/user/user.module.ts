import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './AuthMiddleware';
import { UserController } from './UserController';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';
import { User } from './model/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/login', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
  }
}
