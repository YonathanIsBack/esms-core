import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customer/CustomerRepository';
import { CustomerService } from 'src/customer/CustomerService';
import { ServiceTransactionController } from './ServiceTransactionController';
import { ServiceTransactionRepository } from './ServiceTransactionRepository';
import { ServiceTransactionService } from './ServiceTransactionService';
import { ServiceTransaction } from './model/ServiceTransaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTransaction])],
  controllers: [ServiceTransactionController],
  providers: [
    ServiceTransactionService,
    ServiceTransactionRepository,
    CustomerService,
    CustomerRepository,
  ],
})
export class ServiceTransactionModule {}
