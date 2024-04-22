import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from 'src/database/entities/local.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Local])],
  exports: [TypeOrmModule],  
})
export class DatabaseModule {}

