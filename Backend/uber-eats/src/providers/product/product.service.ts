import { LocalEntity } from "src/database/entities/local.entity"
import { Repository, UpdateResult } from 'typeorm';
export class LocalService {
    repository : Repository<LocalEntity>

    async create(local : LocalEntity) : Promise<LocalEntity> {
        const result = this.repository.create(local);
        return await this.repository.save(result);
    }
}