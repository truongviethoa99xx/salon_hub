import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Branch } from './branch.entity';
import { Booking } from './booking.entity';

@Entity('stylists')
export class Stylist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: true })
  branch_id: number;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', array: true, nullable: true })
  skills: string[];

  @Column({ type: 'boolean', default: false })
  is_busy: boolean;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 5.0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  review_count: number;

  @OneToMany(() => Booking, (booking) => booking.stylist)
  bookings: Booking[];
}

