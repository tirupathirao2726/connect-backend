import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'chat_messages' })
export class ChatMessage {

    @PrimaryGeneratedColumn("uuid", { name: 'message_id' })
    messageId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'sender_id' })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'receiver_id' })
    receiver: User;

    @Column({ name: 'message', type: 'text' })
    message: any;

}