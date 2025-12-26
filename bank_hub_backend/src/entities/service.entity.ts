import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { BookingService } from './booking-service.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  category_id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  duration_minutes: number;

  @Column({ type: 'int', default: 0 })
  processing_gap_minutes: number;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => BookingService, (bookingService) => bookingService.service)
  booking_services: BookingService[];
}

