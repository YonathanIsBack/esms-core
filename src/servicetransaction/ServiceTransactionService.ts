import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTransactionRepository } from './ServiceTransactionRepository';
import { ServiceTransaction } from './model/ServiceTransaction.entity';
import { ServiceTransactionRequestDto } from './model/request/ServiceTransactionRequestDto';
import { CustomerService } from 'src/customer/CustomerService';
import { ServiceTransactionDtlService } from './ServiceTransactionDtlService';

enum status {
  CREATED = 'CREATED',
}

@Injectable()
export class ServiceTransactionService {
  constructor(
    @InjectRepository(ServiceTransaction)
    private readonly serviceTransactionRepository: ServiceTransactionRepository,
    private readonly customerService: CustomerService,
    private readonly serviceTransactionDtlService: ServiceTransactionDtlService,
  ) {}

  async findByCode(transactionCode: string) {
    const transaction = await this.serviceTransactionRepository.findOne({
      where: { transactionCode },
      relations: { customer: true, serviceTransactionDtls: true },
    });

    return transaction;
  }

  async findAll() {
    const transactions = await this.serviceTransactionRepository.find({
      relations: { customer: true },
      order: { transactionDate: 'DESC' },
    });

    return transactions;
  }

  async create(serviceTransactionRequestDto: ServiceTransactionRequestDto) {
    const customer = await this.customerService.findBy({
      id: serviceTransactionRequestDto.customerId,
    });

    const transactionCode = this.generateTransactionCode();
    const serviceTransaction = await this.serviceTransactionRepository.save({
      ...serviceTransactionRequestDto,
      customer,
      status: status.CREATED,
      transactionCode,
    });

    await this.serviceTransactionDtlService.saveBulk(serviceTransactionRequestDto.detail, serviceTransaction);

    return serviceTransaction;
  }

  private generateTransactionCode(): string {
    return new Date().getTime().toString();
  }
}
