import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/database/entities/cliente.entity';
import  { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
    ){}
    //función que pemite crear un nuevo cliente en la Base de datos tiene como parámetros los
    //atributos de la entidad cliente y devuelve el objeto cliente guardado en la base de datos.
    public async create (cliente:Cliente): Promise<Cliente>{
        const result= this.clienteRepository.create(cliente)
        return await this.clienteRepository.save(result);
    }
}
