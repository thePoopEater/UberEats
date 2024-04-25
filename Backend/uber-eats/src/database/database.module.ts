import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from 'src/database/entities/local.entity';
import { Cliente } from 'src/database/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Local]), 
  TypeOrmModule.forFeature([Cliente])],
  exports: [TypeOrmModule],  
})
export class DatabaseModule {}

