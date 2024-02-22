import { Body, Controller, Delete, Get, Param, Patch, Request } from '@nestjs/common';
import { UpdateUserDTO } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {

  constructor(private userService:UserService){}

  @Get()
  async getAllUsers(){
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId:string){
    return await this.userService.getUserById(userId);
  }

  @Patch(':userId')
  async updateUserById(@Param('userId') userId:string, @Body() userUpdate:UpdateUserDTO){
    return await this.userService.updateUserDetailsById(userId,userUpdate)
  }

  @Delete(':userId')
  async deleteUserById(@Param('userId') userId : any){
    console.log("userid",userId);
    return await this.userService.deleteUser(userId)
  }



}
