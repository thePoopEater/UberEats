import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/providers/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const { password } = data;
    const toHash = await hash(password, 10);
    data = { ...data, password: toHash };
    return this.userService.register(data);
  }
  
    async validateUser(username: string, password: string){
        const user = await this.userService.findByUsername(username);
        if (user && (await compare(password, user.password))){
            return user;
    } return null;
}
async login(user: any, role: string): Promise<LoginResponseDTO> {
  if (user.role !== role) {
    throw new UnauthorizedException('No coincide el rol con el usuario');
  }
    const payload = { role: user.role, sub: user.id }; 
    const token = this.jwtService.sign(payload); 
    return { accessToken: token } as LoginResponseDTO;
  }
}
