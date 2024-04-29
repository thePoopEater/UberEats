import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/database/entities/cliente.entity';
import  { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
    ){}
    //función que pemite crear un nuevo cliente en la Base de datos
    public async create (cliente:Cliente): Promise<Cliente>{
        const result= this.clienteRepository.create(cliente)
        return await this.clienteRepository.save(result);
    }
}
