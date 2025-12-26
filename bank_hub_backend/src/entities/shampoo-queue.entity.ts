import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { QueueState } from './enums';
import { Branch } from './branch.entity';
import { Booking } from './booking.entity';

@Entity('shampoo_queue')
export class ShampooQueue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  branch_id: number;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ type: 'int' })
  booking_id: number;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({
    type: 'enum',
    enum: QueueState,
    default: QueueState.WAITING,
  })
  status: QueueState;

  @CreateDateColumn({ type: 'timestamptz' })
  joined_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  started_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at: Date;
}

