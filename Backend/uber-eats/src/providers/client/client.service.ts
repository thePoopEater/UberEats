import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/database/entities/client.entity';
import { Repository } from 'typeorm';
import { OrderService } from '../order/order.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  //función que pemite crear un nuevo cliente en la Base de datos tiene como parámetros los
  //atributos de la entidad cliente y devuelve el objeto cliente guardado en la base de datos.
  public async create(client: ClientEntity): Promise<ClientEntity> {
    const result = this.clientRepository.create(client);

    return await this.clientRepository.save(result);
  }

  public async findClient(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOneBy({ client_id: id });
  }
}
