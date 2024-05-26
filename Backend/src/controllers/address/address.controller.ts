import { Controller,Post,Get,Body,Param,BadRequestException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AddressService } from 'src/providers/address/address.service';
import { AddressCreateDTO } from './dto/address-create.dto';
import { AddressResponseDTO } from './dto/address-response.dto';
import { AddressEntity } from 'src/database/entities/address.entity';
import { ClientEntity } from 'src/database/entities/client.entity';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('address')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  //función que permite crear una nueva dirección, tiene como parámetro los atributos de
  //la entidad Address, se debe ingresar obligatoriamente un cliente_id para permitir la relación
  //de la entidad address y client. Si el cliente se agregó correctamente se retorna el mensaje response.
  @Roles('client')
  @Post()
  async addDireccion(@Body(ValidationPipe) request: AddressCreateDTO): Promise<AddressResponseDTO> {
    if (!request.clientId) {
      throw new BadRequestException("Ingresa un 'clienteId'");
    }
    const newAddress = new AddressEntity();
    newAddress.client = { clientId: request.clientId } as ClientEntity; 
    newAddress.name = request.name;
    newAddress.description = request.description;

    await this.addressService.addAddress(newAddress);

    const response: AddressResponseDTO = {
      data: null,
      statusCode: 200,
      statusDescription: 'Dirección Agregada',
      error: null,
    };
    return response;
  }

  //Función que permite obtener todos las direcciones almacenadas en la tabla 'address'
  //de la base de datos.
  @Roles('admin')
  @Get()
  public async getAllAdress(): Promise<AddressEntity[]> {
    return await this.addressService.getAllAddresses();
  }

    //Función que permite obtener por un id específico una dirección.
    @Get(':id')
    public async getAddress(@Param('id', ParseIntPipe) addressId : number) : Promise<AddressEntity> {
        const address : Promise<AddressEntity> = this.addressService.getAddress(addressId);
        return address;
    }
}
