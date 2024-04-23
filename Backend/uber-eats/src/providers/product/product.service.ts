import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/database/entities/product.entity";

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository : Repository<ProductEntity>,
    ){}
    // Esta funcion crea una fila en la tabla de locales.
    // Author: The dog alday
    public async createProduct(product : ProductEntity) : Promise<ProductEntity> {
        const result = this.productRepository.create(product);
        return await this.productRepository.save(result);
    }

}