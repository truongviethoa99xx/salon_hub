// apps/backend/src/app/common/entities/service-record.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Booking } from './booking.entity';
import { User } from './user.entity';

@Entity('service_records')
export class ServiceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Booking, { nullable: false })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column({ type: 'date' })
  service_date: string;

  @Column({ type: 'date', nullable: true })
  recommended_return_date: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
