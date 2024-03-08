import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecretKey } from 'src/common/constants';

@Module({
  imports: [JwtModule.register({ secret: jwtSecretKey })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
