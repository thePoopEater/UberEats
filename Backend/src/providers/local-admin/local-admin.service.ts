import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { LocalAdminCreateDTO } from 'src/controllers/local-admin/dto/local-admin-create.dto';
import { LocalAdminEntity } from "src/database/entities/local-admin.entity";
import { Repository} from 'typeorm';

@Injectable()
export class LocalAdminService {
    constructor(
        @InjectRepository(LocalAdminEntity) private readonly localAdminRepository : Repository<LocalAdminEntity>
    ) {}
    
    // Esta funcion crea un admin de local, recibe como parametro un objeto de tipo LocalAdminCreateDTO.
    public async create(data : LocalAdminCreateDTO) : Promise<LocalAdminEntity> {      

          return await this.localAdminRepository.save(data);
    }

    public async getAllLocalAdmins() : Promise<LocalAdminEntity[]>{
            return this.localAdminRepository.find();
        }
}