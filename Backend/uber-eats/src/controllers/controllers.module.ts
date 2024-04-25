import { Module } from '@nestjs/common';
import { LocalController } from './local/local.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente/cliente.controller';
import { Local } from  'src/database/entities/local.entity';
import { LocalService }  from 'src/providers/local/local.service';
import { Cliente } from  'src/database/entities/cliente.entity';
import { ClienteService }  from 'src/providers/cliente/cliente.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Local]),
        TypeOrmModule.forFeature([Cliente])
    ],
    controllers:[LocalController, ClienteController],
    providers:[LocalService, ClienteService]
})
export class ControllersModule {} 
