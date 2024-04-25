import { Module } from '@nestjs/common';
import { LocalController } from './local/local.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente/cliente.controller';
import { DireccionController } from './direccion/direccion.controller';
import { Local } from  'src/database/entities/local.entity';
import { LocalService }  from 'src/providers/local/local.service';
import { Cliente } from  'src/database/entities/cliente.entity';
import { ClienteService }  from 'src/providers/cliente/cliente.service';
import { Direccion } from  'src/database/entities/direccion.entity';
import { DireccionService }  from 'src/providers/direccion/direccion.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Local]),
        TypeOrmModule.forFeature([Cliente]),
        TypeOrmModule.forFeature([Direccion])
    ],
    controllers:[LocalController, ClienteController, DireccionController],
    providers:[LocalService, ClienteService, DireccionService]
})
export class ControllersModule {} 
