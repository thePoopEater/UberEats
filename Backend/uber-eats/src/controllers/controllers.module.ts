import { Module } from '@nestjs/common';
import { LocalController } from './local/local.controller';
import { ProductController } from './product/product.controller';
import { ProductService } from 'src/providers/product/product.service';
import { LocalService } from 'src/providers/local/local.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalEntity } from 'src/database/entities/local.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { DatabaseModule } from 'src/database/database.module';
import { OrderController } from './order/order.controller';
import { OrderService } from 'src/providers/order/order.service';
import { OrderEntity } from 'src/database/entities/order.entity';
import { OrderProductEntity } from 'src/database/entities/order-products.entity';
import { OrderProductController } from './order-product/order-product.controller';
import { OrderProductService } from 'src/providers/order-product/order-product.service';

@Module({
    imports:[DatabaseModule,TypeOrmModule.forFeature([ProductEntity,LocalEntity,OrderEntity,OrderProductEntity])],
    controllers: [ProductController,LocalController, OrderController, OrderProductController,],
    providers:[ProductService,LocalService,OrderService,OrderProductService]
})
export class ControllersModule {}
