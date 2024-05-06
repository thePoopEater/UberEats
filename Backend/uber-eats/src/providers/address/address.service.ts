import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';
import { ClientEntity } from 'src/database/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,
        @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>,
    ){}
    //función que permite crear una dirección en el repositorio, primero comprueba que exista 
    //el id del cliente ingresado para crear la dirección.
    public async addAddress (data : AddressEntity){
        const client = await this.clientRepository.findOne({
            where: { client_id: data.client?.client_id },
          });  
          if (!client) {
            throw new NotFoundException("Cliente no encontrado");
          }
          data.client = client; 
          return await this.addressRepository.save(data);
        
    }
}
