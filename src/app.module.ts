import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata"
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { ChatGateway } from './websockets/chat/chat.gateway';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [AppController,UserController],
  providers: [AppService,UserService, ChatGateway],
})
export class AppModule {
}
