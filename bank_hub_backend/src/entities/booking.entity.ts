import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatus } from './enums';
import { User } from './user.entity';
import { Branch } from './branch.entity';
import { Stylist } from './stylist.entity';
import { BookingService } from './booking-service.entity';
import { BookingProduct } from './booking-product.entity';
import { ShampooQueue } from './shampoo-queue.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  booking_code: string;

  @Column({ type: 'int', nullable: true })
  customer_id: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: User | null;

  @Column({ type: 'varchar', length: 100 })
  customer_name: string;

  @Column({ type: 'varchar', length: 20 })
  customer_phone: string;

  @Column({ type: 'int' })
  branch_id: number;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ type: 'int', nullable: true })
  stylist_id: number | null;

  @ManyToOne(() => Stylist, { nullable: true })
  @JoinColumn({ name: 'stylist_id' })
  stylist: Stylist | null;

  @Column({ type: 'date' })
  appointment_date: Date;

  @Column({ type: 'time' })
  appointment_time: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => BookingService, (bookingService) => bookingService.booking)
  booking_services: BookingService[];

  @OneToMany(() => BookingProduct, (bookingProduct) => bookingProduct.booking)
  booking_products: BookingProduct[];

  @OneToMany(() => ShampooQueue, (queue) => queue.booking)
  shampoo_queues: ShampooQueue[];
}

