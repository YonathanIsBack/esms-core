export class ServiceTransactionRequestDto {
  public customerId: string;
  public transactionDate: string

  constructor(body: { customer_id: string, transaction_date: string }) {
    this.customerId = body.customer_id;
    this.transactionDate = body.transaction_date;
  }
}
