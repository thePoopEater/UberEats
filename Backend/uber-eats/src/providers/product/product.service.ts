import { Repository, FindManyOptions, UpdateResult} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/database/entities/product.entity";
import { LocalEntity } from 'src/database/entities/local.entity';
import { ProductCreateDTO } from 'src/controllers/product/dto/product-create.dto';
import { ProductUpdateDTO } from 'src/controllers/product/dto/product-update.dto';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository : Repository<ProductEntity>,
        @InjectRepository(LocalEntity) private readonly localRepository : Repository<LocalEntity>
    ){}

    // Esta funcion crea un registro de un producto en la tabla de los productos.
    public async createProduct(product_data : ProductEntity) : Promise<ProductEntity>{
        return this.productRepository.save(product_data);        
    }

    // Esta funcion busca en el repositorio de productos todos los productos de un local dado por una id.
    public async findAllProductsFromLocal(local_id : number) : Promise<ProductEntity[]> {
        const local : LocalEntity = await this.localRepository.findOneBy({id : local_id});
        const products : Promise<ProductEntity[]> = this.productRepository.findBy({local:local});
        return products;

    }
    // Esta funcion busca UN SOLO producto dado un id, llama al repostorio de los productos.
    public async findOneProduct(product_id : number) : Promise<ProductEntity>{
        const product : Promise<ProductEntity> = this.productRepository.findOneBy({product_id:product_id});
        return product;
    }

    // Esta funcion actualiza un producto, dado un request de tipo ProducUpdateDTO y un id.
    public async updateProduct(product_id : number, product : ProductUpdateDTO): Promise<UpdateResult> {
        const result : UpdateResult = await this.productRepository.update(product_id, product);
        if (result.affected == 0){
            return undefined;
        }
        return result;
    }
}