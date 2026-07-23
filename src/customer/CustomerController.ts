import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GenericResponse } from 'src/util/response/GenericResponse';
import { CustomerService } from './CustomerService';
import { CustomerDto } from './model/CustomerDto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/customer')
  async getAll(): Promise<GenericResponse> {
    const customers = await this.customerService.findAll();

    return GenericResponse.okWithBody(customers);
  }

  @Get('/customer/:customerName')
  async getById(
    @Param('customerName') customerName: string,
  ): Promise<GenericResponse> {
    const customer =
      await this.customerService.findByCustomerName(customerName);

    return GenericResponse.okWithBody(customer);
  }

  @Post('/customer')
  async createCustomer(
    @Body() customerDto: CustomerDto,
  ): Promise<GenericResponse> {
    const customer = await this.customerService.create(
      new CustomerDto(customerDto),
    );

    return GenericResponse.okWithBody(customer);
  }

  @Put('/customer/:customerId')
  async updateCustomer(
    @Body() customerDto: CustomerDto,
    @Param('customerId') customerId: number,
  ): Promise<GenericResponse> {
    const updatedCustomer = await this.customerService.update(
      customerId,
      new CustomerDto(customerDto),
    );

    return GenericResponse.okWithBody(updatedCustomer);
  }

  @Delete('/customer/:customerId')
  async deleteCustomer(
    @Param('customerId') customerId: number
  ): Promise<GenericResponse> {
    await this.customerService.delete(customerId);

    return GenericResponse.ok();
  }
}
