import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata"
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { ChatGateway } from './websockets/chat/chat.gateway';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecretKey } from './common/constants';
@Module({
  imports: [JwtModule.register({secret:jwtSecretKey})],
  controllers: [AppController,UserController],
  providers: [AppService,UserService, ChatGateway, AuthService],
})
export class AppModule {
}
