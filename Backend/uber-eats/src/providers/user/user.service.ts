import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/user.entity"
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository : Repository<UserEntity>,
) {}
}