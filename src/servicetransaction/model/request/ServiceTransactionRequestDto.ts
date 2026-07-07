import { ServiceTransactionDetailDto } from "src/types/ServiceTransactionDetailDto";

type TransactionDetailDto = {
  description: string;
  item_name: string;
  price: number;
};

export class ServiceTransactionRequestDto {
  public customerId: string;
  public transactionDate: string;
  public detail: ServiceTransactionDetailDto[];

  constructor(body: {
    customer_id: string;
    transaction_date: string;
    transaction_detail: TransactionDetailDto[];
  }) {
    this.customerId = body.customer_id;
    this.transactionDate = body.transaction_date;
    this.detail = body.transaction_detail.map((detail) => ({
      solution: detail.description,
      itemName: detail.item_name,
      price: detail.price,
    }));
  }
}
