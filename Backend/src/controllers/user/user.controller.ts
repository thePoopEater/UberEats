import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/providers/user/user.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserEntity } from 'src/database/entities/user.entity';


@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }
  @Get('/clients')
    public async getAllClients(): Promise<UserEntity[]> {
      return await this.userService.getAllClients();
    }

    @Get('/localAdmins')
    public async getAllLocalAdmins(): Promise<UserEntity[]> {
      return await this.userService.getAllLocalAdmins();
    }

    @Get('/clients/:id')
    public async getOneClient(@Param('id', ParseIntPipe) clientId : number) : Promise<UserEntity> {
        return await this.userService.findClient(clientId);
    }

    @Get('/localAdmins/:id')
    public async getOneLocalAdmin(@Param('id', ParseIntPipe) localAdminId : number) : Promise<UserEntity> {
        return await this.userService.findLocalAdmin(localAdminId);
    }

}
