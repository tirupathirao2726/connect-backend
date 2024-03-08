import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { JwtResponseToken } from 'src/dtos/jwt.dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from 'src/dtos/login.dto';
import { JsonWebTokenError } from '@nestjs/jwt';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async userLogin(
    @Body() payload: UserLoginDTO,
  ): Promise<JwtResponseToken | HttpException | JsonWebTokenError> {
    return this.authService.userLogin(payload);
  }
}
