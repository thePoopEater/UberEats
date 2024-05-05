import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path'; 
import { LocalEntity } from './entities/local.entity';
import { ProductEntity } from './entities/product.entity';
import { OrderProductEntity } from './entities/order-products.entity';
import { OrderEntity } from './entities/order.entity';
import { Cliente } from 'src/database/entities/cliente.entity';

// Este archivo establece la configuracion que tiene la base de datos para que 
// el backend puede utilizarlo con objetos TYPEORM

//FIXME: NOTA IMPORTANTE ARREGLAR LOS CONFIGSERVICE.

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService : ConfigService) => ({
                type : 'mysql',
                host : 'localhost',
                port : +configService.get('DB_PORT'),
                username : configService.get('DB_USERNAME'),
                password : configService.get('DB_PASSWORD'),
                database : configService.get('DB_NAME'),
                entities : [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
                synchronize : true,
                autoLoadEntities : true,
            }),
            inject : [ConfigService],
        }),   
        TypeOrmModule.forFeature([LocalEntity,ProductEntity,OrderProductEntity,OrderEntity, Cliente]),
    ],
    exports:[],
    providers: [],
})
export class DatabaseModule {}
