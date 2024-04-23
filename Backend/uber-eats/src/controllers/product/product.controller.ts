import { Controller, Put, Post, Body} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductService } from 'src/providers/product/product.service';
import { ProductEntity } from 'src/database/entities/product.entity';

@Controller('product')
export class ProductController {
    
    constructor(private productService : ProductService){}

    @Post()
    async postProduct(@Body() newProduct : ProductCreateDTO) : Promise<ProductResponseDTO> {
        const product : ProductEntity = new ProductEntity(newProduct); 

        
        const response : ProductResponseDTO = {
            data : 'noting',
            statusCode : 200,
            statusDescription : "Est alisto",
            error : "nothing"
        }

        return response;
    }

}
