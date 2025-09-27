import { Injectable, Scope } from '@nestjs/common';
import { StandardRepository } from 'src/config/StandardRepository';
import { DataSource } from 'typeorm';
import { Customer } from './model/Customer.entity';

@Injectable({ scope: Scope.REQUEST })
export class CustomerRepository extends StandardRepository<Customer> {
  constructor(dataSource: DataSource) {
    super(dataSource, undefined, Customer);
  }
}
