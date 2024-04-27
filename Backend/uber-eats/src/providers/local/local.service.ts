import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LocalEntity } from "src/database/entities/local.entity"
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(LocalEntity)
        private readonly localRepository : Repository<LocalEntity>,
    ) {}

    async create(local : LocalEntity) : Promise<LocalEntity> {
        const result = this.localRepository.create(local);
        return await this.localRepository.save(result);
    }

    async getLocal(idLocal : number) : Promise<LocalEntity> {
        return await this.localRepository.findOne({where:{id:idLocal}});
    }

}