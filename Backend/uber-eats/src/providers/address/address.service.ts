import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';
import { ClientEntity } from 'src/database/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}
  //función que permite crear una dirección en el repositorio, primero comprueba que exista
  //el id del cliente ingresado para crear la dirección.
  public async addAddress(data: AddressEntity) {
    const client = await this.clientRepository.findOne({
      where: { client_id: data.client?.client_id },
    });
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }
    data.client = client;
    return await this.addressRepository.save(data);
  }

  //Función que busca una dirección específica de la tabla 'address' de acuerdo a un id.
  public async getAddress(idAddress: number): Promise<AddressEntity> {
    try {
      const address = await this.addressRepository
        .createQueryBuilder('address')
        .where('address_id = :idAddress', { idAddress })
        .getOne();
      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  //Función que busca todas las direcciones del repositorio de 'address'.
  public async getAllAddresses(): Promise<AddressEntity[]> {
    return this.addressRepository.find();
  }
}
