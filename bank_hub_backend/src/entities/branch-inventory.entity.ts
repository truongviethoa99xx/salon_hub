import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Product } from './product.entity';

@Entity('branch_inventory')
export class BranchInventory {
  @PrimaryColumn({ type: 'int' })
  branch_id: number;

  @PrimaryColumn({ type: 'int' })
  product_id: number;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int', default: 0 })
  quantity: number;
}

