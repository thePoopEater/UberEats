import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AddressService } from 'src/providers/address/address.service';
import { AddressCreateDTO } from './dto/address-create.dto';
import { AddressResponseDTO } from './dto/address-response.dto';
import { AddressEntity } from 'src/database/entities/address.entity';
import { ClientEntity } from 'src/database/entities/client.entity';


@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Post()
  async addDireccion(@Body() request: AddressCreateDTO): Promise<AddressResponseDTO> {
    if (!request.client_id) {
      throw new BadRequestException("Ingresa un 'cliente_id'");
    }
    const newDireccion = new AddressEntity();
    newDireccion.client = { client_id: request.client_id } as ClientEntity; 
    newDireccion.name = request.name;
    newDireccion.description = request.description;
  
    await this.addressService.addAddress(newDireccion); 

    const response: AddressResponseDTO =  {
        data: null,
        statusCode:200,
        statusDescription:"Direccion Agregada",
        error: null
    };

    return response;
  }
}
