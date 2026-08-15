import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customer/CustomerRepository';
import { CustomerService } from 'src/customer/CustomerService';
import { AuthMiddleware } from 'src/user/AuthMiddleware';
import { ServiceTransactionController } from './ServiceTransactionController';
import { ServiceTransactionDtlRepository } from './ServiceTransactionDtlRepository';
import { ServiceTransactionDtlService } from './ServiceTransactionDtlService';
import { ServiceTransactionRepository } from './ServiceTransactionRepository';
import { ServiceTransactionService } from './ServiceTransactionService';
import { ServiceTransaction } from './model/ServiceTransaction.entity';
import { ServiceTransactionDtl } from './model/ServiceTransactionDtl.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceTransaction]),
    TypeOrmModule.forFeature([ServiceTransactionDtl]),
  ],
  controllers: [ServiceTransactionController],
  providers: [
    ServiceTransactionService,
    ServiceTransactionRepository,
    CustomerService,
    CustomerRepository,
    ServiceTransactionDtlService,
    ServiceTransactionDtlRepository,
  ],
})
export class ServiceTransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(ServiceTransactionController);
  }
}
