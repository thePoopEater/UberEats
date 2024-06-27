import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LocalUpdateDTO } from "src/controllers/local/dto/local-update.dto";
import { LocalEntity } from "src/database/entities/local.entity"
import { Repository, UpdateResult } from 'typeorm';
import { LocalCreateDTO } from "src/controllers/local/dto/local-create.dto";
import { Role } from "src/auth/enums/role.enum";
import { UserEntity } from "src/database/entities/user.entity";
@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(LocalEntity) private readonly localRepository : Repository<LocalEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}
    
    // Esta funcion crea un local, recibe como parametro un objeto de tipo LocalCreateDTO
    public async create(data: LocalCreateDTO): Promise<LocalEntity> {
        const buscarLocal = await this.localRepository.findOne({ 
            where: { name: data.name }
        });
        
        if (buscarLocal) {
            throw new BadRequestException('Nombre del local ya existe');
        }
        const user = await this.userRepository.findOne({
            where: { userId: data.userId, role: Role.LOCALADMIN },
        });

        if (!user) {
            throw new NotFoundException("Admin del local no encontrado");
        }
        const newLocal = this.localRepository.create({ ...data, user });

        return await this.localRepository.save(newLocal);
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

