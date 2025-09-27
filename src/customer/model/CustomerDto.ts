import { Customer } from './Customer.entity';

export class CustomerDto {
  customerName: string;
  customerPhone: string;
  customerAddress: string;

  constructor(body: any) {
    this.customerName = body.customer_name;
    this.customerPhone = body.customer_phone;
    this.customerAddress = body.customer_address;
  }

  createCustomer(): Customer {
    const customer: Customer = new Customer();
    customer.customerName = this.customerName;
    customer.customerPhone = this.customerPhone;
    customer.customerAddress = this.customerAddress;

    return customer;
  }
}
