import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { BranchInventory } from './branch-inventory.entity';
import { BookingProduct } from './booking-product.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @OneToMany(() => BranchInventory, (inventory) => inventory.product)
  inventories: BranchInventory[];

  @OneToMany(() => BookingProduct, (bookingProduct) => bookingProduct.product)
  booking_products: BookingProduct[];
}

