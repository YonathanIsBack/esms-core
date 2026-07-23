import { Injectable, Scope } from '@nestjs/common';
import { StandardRepository } from 'src/config/StandardRepository';
import { DataSource } from 'typeorm';
import { ServiceTransactionDtl } from './model/ServiceTransactionDtl.entity';

@Injectable({ scope: Scope.REQUEST })
export class ServiceTransactionDtlRepository extends StandardRepository<ServiceTransactionDtl> {
  constructor(dataSource: DataSource) {
    super(dataSource, undefined, ServiceTransactionDtl);
  }
}
