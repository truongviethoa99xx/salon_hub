import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 100, nullable: true })
  customer_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  platform: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  platform_id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  last_message_at: Date;

  @Column({ type: 'boolean', default: false })
  is_read_by_admin: boolean;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}

