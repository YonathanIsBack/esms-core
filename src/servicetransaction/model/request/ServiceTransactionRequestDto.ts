export class ServiceTransactionRequestDto {
  public customerId: string;
  public transactionDate: string;
  public detail: [];

  constructor(body: { customer_id: string, transaction_date: string , transaction_detail: []}) {
    this.customerId = body.customer_id;
    this.transactionDate = body.transaction_date;
    this.detail = body.transaction_detail;
  }
}
