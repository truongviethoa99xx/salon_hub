// apps/backend/src/app/common/entities/conversation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { SocialPlatform } from '../enums';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' }) // Customer can be null if not yet linked
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column({ type: 'enum', enum: SocialPlatform })
  platform: SocialPlatform;

  @Column({ type: 'varchar', length: 255 })
  social_user_id: string;

  @Column({ type: 'text' })
  message_text: string;

  @Column({ type: 'timestamptz' })
  message_timestamp: Date;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
