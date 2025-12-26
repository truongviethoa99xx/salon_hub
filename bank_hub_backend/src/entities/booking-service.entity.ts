import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Service } from './service.entity';

@Entity('booking_services')
export class BookingService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  booking_id: number;

  @ManyToOne(() => Booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ type: 'int' })
  service_id: number;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_at_booking: number;
}

