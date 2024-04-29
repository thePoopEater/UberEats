import { Controller, Get, Post, Body, Param, Put, BadRequestException, NotFoundException} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductService } from 'src/providers/product/product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { LocalService } from 'src/providers/local/local.service';
import { LocalEntity } from 'src/database/entities/local.entity';
import { UpdateResult } from 'typeorm';
import { ProductUpdateDTO } from './dto/product-update.dto';

@Controller('product')
export class ProductController {
    
    constructor(private productService : ProductService,
                private localService : LocalService){}

    // Esta funcion guarda un Producto en el repositorio de los productos, recibe un dato de tipo ProductCreateDTO,
    // la funcion busca el id de local y le asigna un local a este producto.
    @Post()
    public async postProduct(@Body() newProduct : ProductCreateDTO) : Promise<ProductResponseDTO> {        
        const local = await this.localService.getLocal(newProduct.local_id);
        if (local) {
            const product = new ProductEntity(newProduct);
            product.local = local;
            const created_product  = await this.productService.createProduct(product);
            const response : ProductResponseDTO = {
                // ACA HAY ALGO RARO 
                data : created_product,
                statusCode : 200,
                statusDescription : "Listo",
                error : null
            }
            return response;
        }
        throw new NotFoundException('LOCAL NO EXISTENTE');
    }

    // Esta funcion retorna la informacion de un producto, tiene como parametro el ID de este producto.
    @Get(':id')
    public async getInfo(@Param('id') product_id : number) : Promise<ProductEntity> {
        return await this.productService.findOneProduct(product_id);
    }

    // Esta funcion actualiza un registro de algun producto, tiene como parametro lo que se quiere actualizar y un id.
    @Put(':id')
    public async putProduct(@Param('id') product_id : number, @Body() request : ProductUpdateDTO) : Promise<UpdateResult> {
        return this.productService.updateProduct(product_id, request);
    }

}
