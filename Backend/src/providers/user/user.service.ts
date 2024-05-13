import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from 'src/auth/dto/register.dto';

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
  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }
  getAll() {
    return this.userRepository.find();
  }
}
