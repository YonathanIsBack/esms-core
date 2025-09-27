import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service_transaction_dtl_tbl')
export class ServiceTransactionDtl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'transaction_id' })
  transactionId: number;

  @Column({ name: 'item_name' })
  itemName: string;

  @Column({ name: 'symptom' })
  symptom: string;

  @Column({ name: 'breakdown' })
  breakdown: string;

  @Column({ name: 'solution' })
  solution: string;

  @Column({ name: 'price' })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
