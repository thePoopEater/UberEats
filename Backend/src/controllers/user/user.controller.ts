import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../providers/user/user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //función que devuelve todos los usuarios utilizando un token
  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }
}
