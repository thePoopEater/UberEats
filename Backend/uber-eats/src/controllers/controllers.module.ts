import { Module } from '@nestjs/common';
import { LocalController } from './local/local.controller';
import { ProductController } from './product/product.controller';
import { ProductService } from 'src/providers/product/product.service';
import { LocalService } from 'src/providers/local/local.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalEntity } from 'src/database/entities/local.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports:[DatabaseModule,TypeOrmModule.forFeature([ProductEntity,LocalEntity])],
    controllers: [ProductController,LocalController],
    providers:[ProductService,LocalService]
})
export class ControllersModule {}
