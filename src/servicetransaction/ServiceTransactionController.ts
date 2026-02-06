import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import dayjs from 'dayjs';
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

    return GenericResponse.okWithBody(this.buildTransaction(transaction));
  }

  @Get('/service-transaction/:transactionCode/invoice/plain')
  async invoicePlainText(
    @Param('transactionCode') transactionCode: string,
  ): Promise<GenericResponse> {
    const transaction =
      await this.serviceTransactionService.findByCode(transactionCode);

    if (transaction == null)
      throw new ResourceNotFoundException(
        `Transaction with code ${transactionCode} `,
      );

    return GenericResponse.okWithBody(this.buildTransaction(transaction));
  }

  @Get('/service-transaction')
  async fetchAll(): Promise<GenericResponse> {
    const transaction = await this.serviceTransactionService.findAll();

    return GenericResponse.okWithBody(
      transaction.map((transaction) => ({
        id: transaction.transactionCode,
        customerName: transaction.customer?.customerName,
        transactionDate: dayjs(transaction.transactionDate).format(
          'DD-MM-YYYY',
        ),
      })),
    );
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

  private buildTransaction(transaction) {
    return {
      transaction_code: transaction.transactionCode,
      customer_name: transaction.customer.customerName,
      customer_phone: transaction.customer.customerPhone,
      transaction_date: dayjs(transaction.transactionDate).format('DD-MM-YYYY'),
      total_price: transaction.serviceTransactionDtls.reduce(
        (tempSum, serviceTransactionDtl) =>
          serviceTransactionDtl.price + tempSum,
        0,
      ),
      transaction_dtls: transaction.serviceTransactionDtls.map(
        (serviceTransactionDtl) => ({
          item_name: serviceTransactionDtl.itemName,
          solution: serviceTransactionDtl.solution,
          price: serviceTransactionDtl.price,
        }),
      ),
    };
  }
}
