import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecretKey } from 'src/common/constants';
import { JwtPayload, JwtResponseToken } from 'src/dtos/jwt.dto';

@Injectable()
export class AuthService {
  
  constructor(private jwtService:JwtService){}

  async generateJwtToken(payload: JwtPayload):Promise<JwtResponseToken>{
    try{
      const token = await this.jwtService.signAsync(payload);
      return{
        access_token:token
      }
    }
    catch{
      return{
        access_token:null
      }
    }
  }
  async verifyJwtToekn(jwtToken:JwtResponseToken): Promise<JwtPayload>{
    try{
      const payload = await this.jwtService.verifyAsync(jwtToken.access_token,{secret:jwtSecretKey})
      return payload
    }
    catch(error){
      throw new UnauthorizedException("Invalid token",{cause: error, description:'Invalid jwt token'})
    }
  }
}
