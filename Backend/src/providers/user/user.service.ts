import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { Role } from 'src/auth/enums/role.enum';
import { LocalEntity } from 'src/database/entities/local.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LocalEntity)
    private readonly localRepository: Repository<LocalEntity>,
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

  public async findClient(id : number) : Promise<UserEntity> {
    return await this.userRepository.findOneBy({userId: id, role: Role.CLIENT});
}
public async findLocalAdmin(id : number) : Promise<UserEntity> {
  return await this.userRepository.findOneBy({userId: id, role: Role.LOCALADMIN});
}

public getAllClients() {
  return this.userRepository.find({where: {role: Role.CLIENT },});
}

public getAllLocalAdmins() {
  return this.userRepository.find({where: {role: Role.LOCALADMIN },});
}

public async getLocal (idLocalAdmin: number): Promise<LocalEntity> {
  try{
    const local = await this.localRepository.createQueryBuilder('local').where('local.userId = :idLocalAdmin', { idLocalAdmin }).getOne();
      if (!local){
        throw new NotFoundException('Local no encontrado');
      }
      return local; 
  } catch (error:any){
    throw new Error('Este usuario no tiene ningún local asociado');
  }
}

}
