import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {

  constructor(private userService:UserService){}

  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId:string){
    return this.userService.getUserById(userId);
  }





}
