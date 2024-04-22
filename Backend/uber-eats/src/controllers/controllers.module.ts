import { Module } from '@nestjs/common';
import { LocalController } from './local/local.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from  'src/database/entities/local.entity';
import { LocalService }  from 'src/providers/local/local.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Local])
    ],
    controllers:[LocalController],
    providers:[LocalService]
})
export class ControllersModule {}
