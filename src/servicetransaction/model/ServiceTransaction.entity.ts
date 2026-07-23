import { Customer } from 'src/customer/model/Customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceTransactionDtl } from './ServiceTransactionDtl.entity';

@Entity('service_transaction_tbl')
export class ServiceTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'transaction_code' })
  transactionCode: string;

  @ManyToOne((type) => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'transaction_date' })
  transactionDate: Date;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'finished_date' })
  finishedDate: string;

  @Column({ name: 'invoice_date' })
  invoiceDate: string;

  @Column({ name: 'payment_date' })
  paymentDate: string;

  @Column({ name: 'proof_of_payment' })
  proofOfPayment: string;

  @Column({ name: 'total_payment' })
  totalPayment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany((type) => ServiceTransactionDtl, (dtl) => dtl.serviceTransaction)
  @JoinColumn({ name: 'transaction_id' })
  serviceTransactionDtls: ServiceTransactionDtl[];
}
