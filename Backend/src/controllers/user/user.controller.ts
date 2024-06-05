import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/providers/user/user.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //función que devuelve todos los usuarios utilizando un token.
  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }
}
