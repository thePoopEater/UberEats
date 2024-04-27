import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { LocalCreateDTO } from './dto/local-create.dto';
import { LocalResponseDTO } from './dto/local-response.dto';
import { LocalService } from '../../providers/local/local.service';
import { LocalEntity } from 'src/database/entities/local.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ProductService } from 'src/providers/product/product.service';

@Controller('local')
export class LocalController {

    constructor(private localService : LocalService, private productService : ProductService) {}

    @Post()
    //Datos de un nuevo local: nombre, direccion, horario, descripcion (todos strings)
    async addLocal(@Body() request : LocalCreateDTO) : Promise<LocalResponseDTO> {
        if (request) {
            const newLocal : LocalEntity = new LocalEntity(request); 
            this.localService.create(newLocal);
            const response : LocalResponseDTO = {
                data : "Se creo un usuario",
                statusCode: 200,
                statusDescription : 'Listo',
                error : null
            } as LocalResponseDTO;

            return response;
        }
    }

    @Get(':id')
    async getAllProducts(@Param('id') local_id : number) {
        const products = this.productService.findAllProductsFromLocal(local_id);
        console.log(products);
        return products;
    }
}
