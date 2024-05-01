import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from 'src/database/entities/local.entity';
import { Cliente } from 'src/database/entities/cliente.entity';
import { Direccion } from 'src/database/entities/direccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Local]), 
  TypeOrmModule.forFeature([Cliente]),
  TypeOrmModule.forFeature([Direccion])],
  exports: [TypeOrmModule],  
    imports: [ TypeOrmModule.forFeature([LocalEntity,ProductEntity]),
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

