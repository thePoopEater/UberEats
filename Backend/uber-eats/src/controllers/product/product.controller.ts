import { Controller, Put, Post, Body} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';

@Controller('product')
export class ProductController {
    products : ProductCreateDTO[] = [];
    
    @Post()
    async newProduct(@Body() newProduct : ProductCreateDTO) : Promise<ProductResponseDTO> {
        this.products.push(newProduct);
        const response : ProductResponseDTO = {
            data : 'noting',
            statusCode : 200,
            statusDescription : "Est alisto",
            error : "nothing"
        }
        console.log(this.products);
        return response;
    }

}
