import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTransactionRepository } from './ServiceTransactionRepository';
import { ServiceTransaction } from './model/ServiceTransaction.entity';
import { ServiceTransactionRequestDto } from './model/request/ServiceTransactionRequestDto';

enum status {
  CREATED = 'CREATED'
};

@Injectable()
export class ServiceTransactionService {
  constructor(
    @InjectRepository(ServiceTransaction)
    private readonly serviceTransactionRepository: ServiceTransactionRepository,
  ) {}

  async findByCode(transactionCode: string) {
    const transaction = this.serviceTransactionRepository.findOneBy({
      transactionCode,
    });

    return transaction;
  }

  async create(serviceTransactionRequestDto: ServiceTransactionRequestDto) {
    const transactionCode = this.generateTransactionCode();
    const serviceTransaction = this.serviceTransactionRepository.save({
      ...serviceTransactionRequestDto,
      transactionDate: new Date(),
      transactionCode,
    });

    return serviceTransaction;
  }

  private generateTransactionCode(): string {
    return new Date().getTime().toString();
  }
}
