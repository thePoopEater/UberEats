import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  //función que permite crear una dirección en el repositorio, primero comprueba que exista
  //el id del cliente ingresado para crear la dirección.
  public async addAddress(data: AddressEntity) {
    const user = await this.userRepository.findOne({
      where: { userId: data.user?.userId },
    });
    if (!user) {
      throw new NotFoundException('Cliente no encontrado');
    }
    data.user = user;
    return await this.addressRepository.save(data);
  }

  //Función que busca una dirección específica de la tabla 'address' de acuerdo a un id.
  public async getAddress(idAddress: number): Promise<AddressEntity> {
    try {
      const address = await this.addressRepository
        .createQueryBuilder('address')
        .where('addressId = :idAddress', { idAddress })
        .getOne();
      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public async getAllAdressFromUser(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: userId },
      });
      return this.addressRepository.findBy({ user: user });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  //Función que busca todas las direcciones del repositorio de 'address'.
}
