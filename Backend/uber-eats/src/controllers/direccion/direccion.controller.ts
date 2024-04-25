import { Controller, Post, Body} from '@nestjs/common';
import { DireccionService } from 'src/providers/direccion/direccion.service';

@Controller('direccion')
export class DireccionController {
    constructor(private readonly direccionService:DireccionService){}
    @Post()
    addDireccion(@Body() body:any){
        return  this.direccionService.addDireccion(body);
    }
}
