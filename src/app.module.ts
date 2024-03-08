import { Module } from '@nestjs/common';
import 'reflect-metadata';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { ChatGateway } from './websockets/chat/chat.gateway';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, ChatGateway],
})
export class AppModule {}
