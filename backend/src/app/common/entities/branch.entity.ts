// apps/backend/src/app/common/entities/branch.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SalonResource } from './salon-resource.entity';
import { User } from './user.entity';
import { Booking } from './booking.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @OneToMany(() => User, (user) => user.branch)
  staff: User[];

  @OneToMany(() => SalonResource, (resource) => resource.branch)
  resources: SalonResource[];

  @OneToMany(() => Booking, (booking) => booking.branch)
  bookings: Booking[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
