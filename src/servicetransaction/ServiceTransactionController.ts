import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResourceNotFoundException } from 'src/exception/ResourceNotFoundException';
import { GenericResponse } from 'src/util/response/GenericResponse';
import { ServiceTransactionService } from './ServiceTransactionService';
import { ServiceTransactionRequestDto } from './model/request/ServiceTransactionRequestDto';

@Controller()
export class ServiceTransactionController {
  constructor(
    private readonly serviceTransactionService: ServiceTransactionService,
  ) {}

  @Get('/service-transaction/:transactionCode')
  async findByCode(
    @Param('transactionCode') transactionCode: string,
  ): Promise<GenericResponse> {
    const transaction =
      await this.serviceTransactionService.findByCode(transactionCode);

    if (transaction == null)
      throw new ResourceNotFoundException(
        `Transaction with code ${transactionCode} `,
      );

    return GenericResponse.okWithBody(transaction);
  }

  @Post('/service-transaction')
  async createServiceTransaction(
    @Body() requestBody: { customer_id: string; transaction_date: string },
  ): Promise<GenericResponse> {
    const serviceTransactionRequestDto = new ServiceTransactionRequestDto(
      requestBody,
    );

    const serviceTransaction = await this.serviceTransactionService.create(
      serviceTransactionRequestDto,
    );

    return GenericResponse.okWithBody(serviceTransaction);
  }
}
