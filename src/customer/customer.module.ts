import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/user/AuthMiddleware';
import { CustomerController } from './CustomerController';
import { CustomerRepository } from './CustomerRepository';
import { CustomerService } from './CustomerService';
import { Customer } from './model/Customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(CustomerController);
  }
}
