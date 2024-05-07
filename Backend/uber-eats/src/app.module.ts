import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; 
import { ControllersModule } from './controllers/controllers.module'; 
import { UserService } from './providers/user/user.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),ControllersModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
