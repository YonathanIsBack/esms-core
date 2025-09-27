import { Injectable, Scope } from '@nestjs/common';
import { StandardRepository } from 'src/config/StandardRepository';
import { DataSource } from 'typeorm';
import { ServiceTransaction } from './model/ServiceTransaction.entity';

@Injectable({ scope: Scope.REQUEST })
export class ServiceTransactionRepository extends StandardRepository<ServiceTransaction> {
  constructor(dataSource: DataSource) {
    super(dataSource, undefined, ServiceTransaction);
  }
}
