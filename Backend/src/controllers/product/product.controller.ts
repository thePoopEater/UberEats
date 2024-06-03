import { Controller,Get,Post,Body,Param,Put,BadRequestException,NotFoundException, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductService } from 'src/providers/product/product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { LocalService } from 'src/providers/local/local.service';
import { LocalEntity } from 'src/database/entities/local.entity';
import { UpdateResult } from 'typeorm';
import { ProductUpdateDTO } from './dto/product-update.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private localService: LocalService,
  ) {}

    // Esta funcion guarda un Producto en el repositorio de los productos, recibe un dato de tipo ProductCreateDTO,
    // la funcion busca el id de local y le asigna un local a este producto.
    @Roles('localAdmin')
    @Post()
    public async postProduct(@Body(ValidationPipe) newProduct : ProductCreateDTO) : Promise<ProductResponseDTO> {        
        const local = await this.localService.getLocal(newProduct.localId);
        if (local) {
            const product = new ProductEntity(newProduct);
            product.local = local;
            await this.productService.createProduct(product);
            const response : ProductResponseDTO = {
                data : null,
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
    public async getInfo(@Param('id', ParseIntPipe) productId : number) : Promise<ProductEntity> {
        return await this.productService.findOneProduct(productId);
    }

    // Esta funcion actualiza un registro de algun producto, tiene como parametro lo que se quiere actualizar y un id.
    @Roles('localAdmin')
    @Put(':id')
    public async putProduct(@Param('id', ParseIntPipe) productId : number, @Body() request : ProductUpdateDTO) : Promise<UpdateResult> {
        return this.productService.updateProduct(productId, request);
    }
}
