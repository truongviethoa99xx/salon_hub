import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { BusyLevel } from './enums';
import { Stylist } from './stylist.entity';
import { Booking } from './booking.entity';
import { ShampooQueue } from './shampoo-queue.entity';
import { BranchInventory } from './branch-inventory.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_hotline: string;

  @Column({ type: 'text', nullable: true })
  map_url: string;

  @Column({
    type: 'enum',
    enum: BusyLevel,
    default: BusyLevel.LOW,
  })
  live_busy_level: BusyLevel;

  @Column({ type: 'int', default: 0 })
  live_chairs_available: number;

  @Column({ type: 'int', default: 0 })
  live_beds_waiting: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => Stylist, (stylist) => stylist.branch)
  stylists: Stylist[];

  @OneToMany(() => Booking, (booking) => booking.branch)
  bookings: Booking[];

  @OneToMany(() => ShampooQueue, (queue) => queue.branch)
  shampoo_queues: ShampooQueue[];

  @OneToMany(() => BranchInventory, (inventory) => inventory.branch)
  inventories: BranchInventory[];
}

