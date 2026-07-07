import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTransactionDtlRepository } from './ServiceTransactionDtlRepository';
import { ServiceTransactionDtl } from './model/ServiceTransactionDtl.entity';
import { ServiceTransactionDetailDto } from 'src/types/ServiceTransactionDetailDto';
import { ServiceTransaction } from './model/ServiceTransaction.entity';

@Injectable()
export class ServiceTransactionDtlService {
  constructor(
    @InjectRepository(ServiceTransactionDtl)
    private readonly serviceTransactionDtlRepository: ServiceTransactionDtlRepository,
  ) {}

  async saveBulk(serviceTransactionDtls: ServiceTransactionDetailDto[], serviceTransaction: ServiceTransaction) {
    return serviceTransactionDtls.map((detail) => {
      return this.create(detail, serviceTransaction);
    });
  }

  async create(serviceTransactionDtl: ServiceTransactionDetailDto, serviceTransaction: ServiceTransaction) {
    return this.serviceTransactionDtlRepository.save({...serviceTransactionDtl, serviceTransaction});
  }
}
