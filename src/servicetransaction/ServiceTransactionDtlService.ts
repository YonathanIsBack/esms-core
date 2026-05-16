import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTransactionDtl } from './model/ServiceTransactionDtl.entity';
import { ServiceTransactionDtlRepository } from './ServiceTransactionDtlRepository';

@Injectable
export class ServiceTransactionDtlService {
  constructor(
    @InjectRepository(ServiceTransactionDtl)
    private readonly serviceTransactionRepository: ServiceTransactionDtlRepository,
  ) {}
}
