import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceTransaction } from './ServiceTransaction.entity';

@Entity('service_transaction_dtl_tbl')
export class ServiceTransactionDtl {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ServiceTransaction)
  @JoinColumn({ name: 'transaction_id' })
  serviceTransaction: ServiceTransaction;

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

  ServiceTransactionDtl(body: {
    description: string;
    item_name: string;
    price: number;
    quantity: number;
  }) {
    this.solution = body.description;
    this.itemName = body.item_name;
    this.price = body.price;
  }
}
