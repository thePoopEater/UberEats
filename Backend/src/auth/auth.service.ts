import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/providers/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserDTO } from 'src/controllers/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const { email, password, role } = data; 
    const buscarEmail = await this.userService.findByEmail(email);
    if (buscarEmail) {
      throw new UnauthorizedException('Ya existe una cuenta registrada con este email');
    }
    
    const hashedPassword = await hash(password, 10);
    const newUser = await this.userService.register({ ...data, password: hashedPassword });
    return newUser;
  }  
  
  async validateEmail(email: string, password: string, ) {
    const user = await this.userService.findByEmail(email);
    if (user && await compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: UserDTO): Promise<LoginResponseDTO> {

    const payload = { role: user.role, sub: user.userId};
    const token = this.jwtService.sign(payload);
    return { accessToken: token } as LoginResponseDTO;
  }
}
