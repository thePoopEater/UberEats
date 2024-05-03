import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { Local } from  'src/database/entities/local.entity';
import { Repository} from 'typeorm';

@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(Local) private readonly localRepository: Repository<Local>,

    ){}
    //función que permite obtener todos los locales de la base de datos.
    //Busca en el repositorio y devuelve un array con los locales que existen.
    public async getAllLocals(): Promise<Local[]>  {
        const result = this.localRepository.find();
        return result;
    }
    //función que permite obtener un local del repositorio por su id. 
    //Recibe como parámetro el id de un local a buscar, devuelve el local con sus atributos correspondientes.
    public async getLocal(id: number): Promise <Local>{
        try{
            const result = await this.localRepository.createQueryBuilder('local').where("local.id= :id", {id}).getOne();
            return result;
        }catch (error:any){
            throw new Error(error);
        }
    }
}
