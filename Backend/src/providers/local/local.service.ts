import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LocalUpdateDTO } from "src/controllers/local/dto/local-update.dto";
import { LocalEntity } from "src/database/entities/local.entity"
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(LocalEntity)
        private readonly localRepository : Repository<LocalEntity>,
    ) {}

    // Esta funcion crea un local, recibe como parametro un objeto de tipo LocalEntity.
    public async create(local : LocalEntity) : Promise<LocalEntity> {
        const result = this.localRepository.create(local);
        return await this.localRepository.save(result);
    }
    // Esta funcion busca UN SOLO local, dado por una ID.
    public async getLocal(idLocal: number): Promise <LocalEntity>{
        try{
            const local = await this.localRepository.createQueryBuilder('local').where("id= :idLocal", {idLocal}).getOne();
            return local;
        }catch (error:any){
            throw new Error(error);
        }
    }
    // Esta funcion actualiza un registro dado por un request de tipo LocalUpdateDTO y un id.
    public async updateLocal(localId : number, local : LocalUpdateDTO) : Promise<UpdateResult> {
        const result : UpdateResult = await this.localRepository.update(localId, local);

        if (result.affected == 0){ 
            return undefined;
        }
        return result;
    }
    // Esta funcion busca todos los locales del repositorio.
    public async getAllLocals() : Promise<LocalEntity[]>{
        return this.localRepository.find();
    }

}

