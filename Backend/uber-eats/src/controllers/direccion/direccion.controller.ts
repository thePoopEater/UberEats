import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { DireccionService } from 'src/providers/direccion/direccion.service';
import { IPostDireccionRequest } from './dto/IPostDireccionRequest';
import { IPostDireccionResponse } from './dto/IPostDireccionResponse';
import { Direccion } from 'src/database/entities/direccion.entity';
import { Cliente } from 'src/database/entities/cliente.entity';


@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}
  @Post()
  async addDireccion(@Body() request: IPostDireccionRequest): Promise<IPostDireccionResponse> {
    if (!request.cliente_id) {
      throw new BadRequestException("Ingresa un 'cliente_id'");
    }

    const newDireccion = new Direccion();
    newDireccion.cliente = { id: request.cliente_id } as Cliente; 
    newDireccion.nombre = request.nombre;
    newDireccion.descripcion = request.descripcion;
  

    await this.direccionService.addDireccion(newDireccion); 

    const response: IPostDireccionResponse =  {
        data: null,
        statusCode:200,
        statusDescription:"Direccion Agregada",
        error: null

    };
    return response;
  }
}
