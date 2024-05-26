import {Controller,Post,Body,UnauthorizedException, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) data: RegisterDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  async postLogin(@Body(ValidationPipe) request: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.authService.validateUser(
      request.username,
      request.password,
    );
    if (!user) {
      throw new UnauthorizedException('User incorrecto');
    }
  
    const { accessToken, clientId } = await this.authService.login(user, request.role);
  
    return { accessToken, clientId };
  }
}
