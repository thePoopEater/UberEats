import { Module } from '@nestjs/common';
import { LocalController } from './local/local.controller';
import { ProductController } from './product/product.controller';

@Module({
    imports:[],
    controllers: [LocalController, ProductController],
    providers:[]
})
export class ControllersModule {}
