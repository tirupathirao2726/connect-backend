import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { dataSource } from 'src/config/database/datasource';
import { User } from 'src/entities/user.entity';
@Injectable()
export class UserService {

  async getAllUsers(){
    const queryRunner =  dataSource.createQueryRunner();
    try{
      await queryRunner.connect();
      const users = await queryRunner.manager.find(User)
      return users;
    }
    catch(error){
      throw new HttpException('Unable to fetch users',HttpStatus.FORBIDDEN,{cause: error})
    }
    finally{
      await queryRunner.release();
    }
  }

  async getUserById(userId:string){
    const queryRunner =  dataSource.createQueryRunner();
    try{
      await queryRunner.connect();
      const user = queryRunner.manager.findOneBy(User,{userId:userId})
      return user;
    }
    catch(error){
      throw new HttpException(`Unable to fetch user with id ${userId}`,HttpStatus.FORBIDDEN,{cause:error})
    }
    finally{
      await queryRunner.release();
    }
  }

  
}
