import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customer/CustomerRepository';
import { CustomerService } from 'src/customer/CustomerService';
import { ServiceTransactionController } from './ServiceTransactionController';
import { ServiceTransactionRepository } from './ServiceTransactionRepository';
import { ServiceTransactionService } from './ServiceTransactionService';
import { ServiceTransaction } from './model/ServiceTransaction.entity';
import { ServiceTransactionDtlService } from './ServiceTransactionDtlService';
import { ServiceTransactionDtlRepository } from './ServiceTransactionDtlRepository';
import { ServiceTransactionDtl } from './model/ServiceTransactionDtl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTransaction]), TypeOrmModule.forFeature([ServiceTransactionDtl])],
  controllers: [ServiceTransactionController],
  providers: [
    ServiceTransactionService,
    ServiceTransactionRepository,
    CustomerService,
    CustomerRepository,
    ServiceTransactionDtlService,
    ServiceTransactionDtlRepository
  ],
})
export class ServiceTransactionModule {}
