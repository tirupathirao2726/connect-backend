import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { jwtSecretKey } from 'src/common/constants';
import { dataSource } from 'src/config/database/datasource';
import { JwtPayloadDTO, JwtResponseToken } from 'src/dtos/jwt.dto';
import { UserLoginDTO } from 'src/dtos/login.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  
  constructor(private jwtService:JwtService){}

  async userLogin(payload:UserLoginDTO):Promise<JwtResponseToken | HttpException | JsonWebTokenError>{
    const queryRunner = dataSource.createQueryRunner();
    try{
      await queryRunner.connect();
      const user = await queryRunner.manager.findOneBy(User,{email:payload.email});
      if(user){
        return await this.generateJwtToken({
          sub: user.userId,
          name: user.name
        })
      }
      else{
        return new UnauthorizedException('User not found')
      }
    }
    catch(error){
      return new UnauthorizedException("Unauthorized error",{cause:error,description:"User not registered"})
    }
    finally{
      await queryRunner.release();
    }
  }

  async generateJwtToken(payload: JwtPayloadDTO):Promise<JwtResponseToken | JsonWebTokenError>{
    try{
      const token = await this.jwtService.signAsync(payload);
      return{
        access_token:token
      }
    }
    catch(error){
      return error;
    }
  }
  async verifyJwtToken(jwtToken:JwtResponseToken): Promise<JwtPayloadDTO | JsonWebTokenError>{
    try{
      const payload = await this.jwtService.verifyAsync(jwtToken.access_token,{secret:jwtSecretKey})
      return payload
    }
    catch(error){
      return error
    }
  }
}
