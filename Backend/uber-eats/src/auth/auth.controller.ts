import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDTO){
    return this.authService.register(data);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req: any){
   return this.authService.login(req.user);
  }
}
