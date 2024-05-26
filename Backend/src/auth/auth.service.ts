import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/providers/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserDTO } from 'src/controllers/user/dto/user.dto';
import { ClientService } from 'src/providers/client/client.service'; // nuevo: import de ClientService
import { ClientEntity } from 'src/database/entities/client.entity'; // nuevo: import de ClientEntity

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService, // nuevo
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const { username, password, role, name, lastName } = data;  // nuevo: agregar role, name y lastName
    const buscarUser = await this.userService.findByUsername(username);
    if (buscarUser) {
      throw new UnauthorizedException('Ya existe ese nombre de usuario');
    }
    
    const hashedPassword = await hash(password, 10);
    const newUser = await this.userService.register({ ...data, password: hashedPassword });
    //nuevo:desde aquí
    if (role === 'client') {
      const newClient = new ClientEntity({
        userId: newUser.userId, name, lastName, addresses: [], orders: []     
      });
      await this.clientService.create(newClient); // nuevo: crear el cliente
    }
    return newUser;
    //nuevo: hasta aquí
  }  
  
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && await compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: UserDTO, role: string): Promise<LoginResponseDTO> {
    if (user.role !== role) {
      throw new UnauthorizedException('No coincide el rol con el usuario');
    }
   //nuevo----
    let clientId: number | undefined;

    if (user.role === 'client') {
      const client = await this.clientService.getClient(user.userId);
      clientId = client?.clientId;
    }
     //----nuevo
    const payload = { role: user.role, sub: user.userId };
    const token = this.jwtService.sign(payload);

    return { accessToken: token, clientId: clientId } as LoginResponseDTO;//nuevo
  }
}
