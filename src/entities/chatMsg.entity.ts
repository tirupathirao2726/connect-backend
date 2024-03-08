import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'chat_messages' })
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid', { name: 'message_id' })
  messageId: string;

  @ManyToOne(() => User, { cascade: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, { cascade: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ name: 'message', type: 'text' })
  message: any;

  @Column({ name: 'message_sent_at', type: 'timestamptz' })
  messageSentAt: Date;
}
