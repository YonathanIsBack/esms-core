import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service_transaction_tbl')
export class ServiceTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'transaction_code' })
  transactionCode: string;

  @Column({ name: 'customer_id' })
  customerId: string;

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
}
