import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from 'src/database/entities/direccion.entity';
import { Cliente } from 'src/database/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionService {
    constructor(
        @InjectRepository(Direccion) private readonly direccionRepository: Repository<Direccion>,
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
    ){}
    public async addDireccion (data:Direccion){
        const cliente = await this.clienteRepository.findOne({
            where: { id: data.cliente?.id },
          });  
          if (!cliente) {
            throw new NotFoundException("Cliente no encontrado");
          }
          data.cliente = cliente; 
          return await this.direccionRepository.save(data);
        
    }
}
