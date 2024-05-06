import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; 
import { ControllersModule } from './controllers/controllers.module'; 
import { ClientService } from './providers/client/client.service';
import { AddressService } from './providers/address/address.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),ControllersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
