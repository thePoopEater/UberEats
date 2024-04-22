import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm'
import { Local } from  './local.entity'
import { Repository, FindManyOptions} from 'typeorm'

@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(Local)
        private readonly: localRepository: Repository<Local>,
    ){}

    public async getAllLocals(): Promise<Local[]>  {
        const result = this.localRepository.find();
        return result;
    }
    public async getLocal(id: number): Promise <Local>{
        try{
            const result = await this.localRepository.createQueryBuilder('local').where("local.id= :id", {id}).getOne();
            return result;
        }catch (error:any){
            throw new Error(error);
        }
    }
