import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AddressService } from 'src/providers/address/address.service';
import { AddressCreateDTO } from './dto/address-create.dto';
import { AddressResponseDTO } from './dto/address-response.dto';
import { AddressEntity } from 'src/database/entities/address.entity';
import { ClientEntity } from 'src/database/entities/client.entity';


@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  //función que permite crear una nueva dirección, tiene como parámetro los atributos de
  //la entidad Address, se debe ingresar obligatoriamente un cliente_id para permitir la relación
  //de la entidad address y client. Si el cliente se agregó correctamente se retorna el mensaje response.
  @Post()
  async addDireccion(@Body() request: AddressCreateDTO): Promise<AddressResponseDTO> {
    if (!request.client_id) {
      throw new BadRequestException("Ingresa un 'cliente_id'");
    }
    const newAddress = new AddressEntity();
    newAddress.client = { client_id: request.client_id } as ClientEntity; 
    newAddress.name = request.name;
    newAddress.description = request.description;
  
    await this.addressService.addAddress(newAddress); 

    const response: AddressResponseDTO =  {
        data: null,
        statusCode:200,
        statusDescription:"Dirección Agregada",
        error: null
    };
    return response;
  }
}
