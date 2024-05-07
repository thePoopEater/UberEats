import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/providers/user/user.service';


@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userService: UserService){}
    //función que devuelve todos los usuarios dutilizando un token
    @Get()
    
    async getAllUsers(){
        return await this.userService.getAll();
}
}
