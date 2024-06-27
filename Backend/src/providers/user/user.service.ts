import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async register(data: RegisterDTO) {
    const user = await this.userRepository.save(data);
    const { password, ...result } = user;
    return result;
  }
  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
  getAll() {
    return this.userRepository.find();
  }
  
async buscarUserRole(userId: number, role: Role): Promise<UserEntity> {
  const user = await this.userRepository.findOne({ where: { userId, role } });
  if (!user) {
      throw new NotFoundException(`Usuario no encontrado`);
  }
  return user;
}

//VERIFICAR----
  public async findClient(id : number) : Promise<UserEntity> {
    return await this.userRepository.findOneBy({userId: id, role: Role.CLIENT});
}

//VERIFICAR----
public async findLocalAdmin(id : number) : Promise<UserEntity> {
  return await this.userRepository.findOneBy({userId: id, role: Role.LOCALADMIN});
}

public getAllClients() {
  return this.userRepository.find({where: {role: Role.CLIENT },});
}

public getAllLocalAdmins() {
  return this.userRepository.find({where: {role: Role.LOCALADMIN },});
}


}
