import { Repository, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/database/entities/product.entity";
import { LocalEntity } from 'src/database/entities/local.entity';
import { ProductCreateDTO } from 'src/controllers/product/dto/product-create.dto';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository : Repository<ProductEntity>,
        @InjectRepository(LocalEntity) private readonly localRepository : Repository<LocalEntity>
    ){}

    // Esta funcion crea una fila en la tabla de locales.
    // Author: The dog alday
    public async createProduct(product : ProductEntity){
        const local : LocalEntity = await this.localRepository.findOne({where:{id:product.local.id}});

        const newProduct = new ProductEntity(product);
        newProduct.local = local;

        return this.productRepository.save(newProduct);
    }

    public async findAllProductsFromLocal(a : number) : Promise<ProductEntity[]> {
        const local : LocalEntity = await this.localRepository.findOneBy({id : a});

        const products : Promise<ProductEntity[]> = this.productRepository.findBy({local:local});

        return products;

    }
}