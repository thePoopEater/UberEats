import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { Local } from  'src/database/entities/local.entity';
import { Repository} from 'typeorm';

@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(Local) private readonly localRepository: Repository<Local>,

    ){}
    //función que permite obtener todos los locales de la Base de datos
    public async getAllLocals(): Promise<Local[]>  {
        const result = this.localRepository.find();
        return result;
    }
    //función que permite obtener un local por su id en la Base de datos
    public async getLocal(id: number): Promise <Local>{
        try{
            const result = await this.localRepository.createQueryBuilder('local').where("local.id= :id", {id}).getOne();
            return result;
        }catch (error:any){
            throw new Error(error);
        }
    }
}
