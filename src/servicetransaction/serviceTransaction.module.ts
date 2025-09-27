import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceTransactionController } from './ServiceTransactionController';
import { ServiceTransactionService } from './ServiceTransactionService';
import { ServiceTransaction } from './model/ServiceTransaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTransaction])],
  controllers: [ServiceTransactionController],
  providers: [ServiceTransactionService],
})
export class ServiceTransactionModule {}
