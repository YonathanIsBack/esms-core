import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service_transaction_dtl_photo_tbl')
export class ServiceTransactionDtlPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'transaction_dtl_id' })
  transactionDtlId: number;

  @Column({ name: 'photo' })
  photo: string;

  @Column({ name: 'caption' })
  caption: string;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
