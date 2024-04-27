import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductService } from 'src/providers/product/product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { LocalService } from 'src/providers/local/local.service';
import { LocalEntity } from 'src/database/entities/local.entity';

@Controller('product')
export class ProductController {
    
    constructor(private productService : ProductService,
                private localService : LocalService
        ){}

    @Post()
    async postProduct(@Body() newProduct : ProductCreateDTO) : Promise<ProductResponseDTO> {
        const product : ProductEntity = new ProductEntity(newProduct);
        const local : LocalEntity = await this.localService.getLocal(newProduct.local_id);

        product.local = local;
        
        this.productService.createProduct(product);
        const response : ProductResponseDTO = {
            data : 'noting',
            statusCode : 200,
            statusDescription : "Listo",
            error : "Nothing"
        }
        return response;
    }

}
