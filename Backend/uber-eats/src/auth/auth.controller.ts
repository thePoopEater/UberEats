import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/user.entity';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDTO){
    return this.authService.register(data);
  }

  @Post('login')
  async postLogin(@Body() request: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.authService.validateUser(request.username, request.password);

    if (!user) {
      throw new UnauthorizedException('User incorrecto');
    }

    const token = await this.authService.login(user); 
    const response: LoginResponseDTO = {
      accessToken: token.accessToken, 
    };

    return response;
  }
}

