import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path'; 
import { LocalEntity } from './entities/local.entity';
import { ProductEntity } from './entities/product.entity';
import { OrderProductEntity } from './entities/order-products.entity';
import { OrderEntity } from './entities/order.entity';

// Este archivo establece la configuracion que tiene la base de datos para que 
// el backend puede utilizarlo con objetos TYPEORM

//FIXME: NOTA IMPORTANTE ARREGLAR LOS CONFIGSERVICE.

@Module({
    imports: [ TypeOrmModule.forFeature([LocalEntity,ProductEntity,OrderProductEntity,OrderEntity]),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService : ConfigService) => ({
                type : 'mysql',
                host : 'localhost',
                port : +configService.get('DB_PORT'),
                username : 'admin',
                password : '123',
                database : 'nestdb',
                entities : [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
                synchronize : true,
                autoLoadEntities : true,
            }),
            inject : [ConfigService],
        }),   
       
    ],
    exports:[],
    providers: [],
})
export class DatabaseModule {}
