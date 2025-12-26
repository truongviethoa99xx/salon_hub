import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity('social_accounts')
@Index(['provider', 'provider_id'], { unique: true })
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 20 })
  provider: string; // 'google', 'facebook'

  @Column({ type: 'varchar', length: 255 })
  provider_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provider_email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
