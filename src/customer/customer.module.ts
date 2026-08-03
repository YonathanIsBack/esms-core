import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './CustomerController';
import { CustomerRepository } from './CustomerRepository';
import { CustomerService } from './CustomerService';
import { Customer } from './model/Customer.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/exception/HttpExceptionFilter';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CustomerModule {}
