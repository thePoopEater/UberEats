import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';

import { LocalEntity } from 'src/database/entities/local.entity';
import { LocalService } from 'src/providers/local/local.service';
import { LocalController } from './local/local.controller';


import { ProductEntity } from 'src/database/entities/product.entity';
import { ProductService } from 'src/providers/product/product.service';
import { ProductController } from './product/product.controller';

import { OrderEntity } from 'src/database/entities/order.entity';
import { OrderService } from 'src/providers/order/order.service';
import { OrderController } from './order/order.controller';

import { OrderProductEntity } from 'src/database/entities/order-products.entity';
import { OrderProductService } from 'src/providers/order-product/order-product.service';
import { OrderProductController } from './order-product/order-product.controller';


import { AddressEntity } from  'src/database/entities/address.entity';
import { AddressService }  from 'src/providers/address/address.service';
import { AddressController } from './address/address.controller';

import { UserEntity } from 'src/database/entities/user.entity';
import { UserService }  from 'src/providers/user/user.service';
import { UserController } from './user/user.controller';

import { RoutesEntity } from 'src/database/entities/routes.entity';
import { RoutesController } from './routes/routes.controller';
import { RoutesService } from 'src/providers/routes/routes.service';


@Module({
    imports:[DatabaseModule, TypeOrmModule.forFeature([ProductEntity,LocalEntity,OrderEntity,OrderProductEntity, AddressEntity, UserEntity, RoutesEntity])],
    controllers: [ProductController,LocalController, OrderController, OrderProductController, AddressController, UserController, RoutesController],
    providers:[ProductService,LocalService,OrderService,OrderProductService,AddressService, UserService, RoutesService]
})
export class ControllersModule {}
