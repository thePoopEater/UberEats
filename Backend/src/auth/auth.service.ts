import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/providers/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserDTO } from 'src/controllers/user/dto/user.dto';
import { ClientService } from 'src/providers/client/client.service'; 
import { ClientEntity } from 'src/database/entities/client.entity'; 
import { LocalAdminEntity } from 'src/database/entities/local-admin.entity';
import { LocalAdminService } from 'src/providers/local-admin/local-admin.service';
import { LocalAdminCreateDTO } from 'src/controllers/local-admin/dto/local-admin-create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService, 
    private readonly localAdminService: LocalAdminService,
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
    if (role === 'client') {
      const newClient = new ClientEntity({
        userId: newUser.userId, addresses: [], orders: []     
      });
      await this.clientService.create(newClient);
    }
    if (role === 'localAdmin'){
      const newLocalAdmin= new LocalAdminCreateDTO({
        userId: newUser.userId, locals: []
      })
      await this.localAdminService.create(newLocalAdmin);
    }
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
    let clientId: number;
    let localAdminId: number;

    if (user.role === 'client') {
      const client = await this.clientService.getClientUser(user.userId);
      clientId = client?.clientId;
    }
    if (user.role === 'localAdmin') {
      const localAdmin = await this.localAdminService.getLocalAdminUser(user.userId);
      localAdminId = localAdmin?.localAdminId;
    }
    const payload = { role: user.role, sub: user.userId };
    const token = this.jwtService.sign(payload);
    return { accessToken: token, role: user.role, clientId: clientId, localAdminId: localAdminId} as LoginResponseDTO;
  }
}
