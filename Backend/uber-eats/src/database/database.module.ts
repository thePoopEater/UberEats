import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Local } from 'src/database/entities/local.entity'
@Module({
    imports:[
        TypeOrmModule.forFeature([Local])
    ],
    exports: [],
    providers:[]
})
export class DatabaseModule {}
