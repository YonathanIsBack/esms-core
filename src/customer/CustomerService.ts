import { Injectable, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/config/TransactionInterceptor';
import { ResourceNotFoundException } from 'src/exception/ResourceNotFoundException';
import { ILike } from 'typeorm';
import { CustomerRepository } from './CustomerRepository';
import { Customer } from './model/Customer.entity';
import { CustomerDto } from './model/CustomerDto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerRepository.find();

    return customers;
  }

  async findByCustomerName(customerName: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({
      customerName: ILike(`%${customerName}%`),
    });

    if (customer == null) {
      throw new ResourceNotFoundException(Customer.name);
    }

    return customer;
  }

  async findBy(options: object): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy(options);

    if (customer == null) {
      throw new ResourceNotFoundException(Customer.name);
    }

    return customer;
  }

  @UseInterceptors(TransactionInterceptor)
  create(customerDto: CustomerDto): Promise<Customer> {
    const customer = customerDto.createCustomer();

    return this.customerRepository.save(customer);
  }

  @UseInterceptors(TransactionInterceptor)
  async update(
    customerId: number,
    customerDto: CustomerDto,
  ): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    if (existingCustomer == null) {
      throw new ResourceNotFoundException(
        `${Customer.name} with ID : ${customerId}`,
      );
    }

    return this.customerRepository.save({
      ...existingCustomer,
      ...customerDto,
    });
  }

  async delete(customerId: number) {
    await this.customerRepository.delete({id: customerId});
  }
}
