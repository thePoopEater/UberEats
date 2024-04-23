import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path'; 

// Este archivo establece la configuracion que tiene la base de datos para que 
// el backend puede utilizarlo con objetos TYPEORM

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService : ConfigService) => ({
                type : 'mysql',
                host : configService.get('DB_HOST'),
                port : +configService.get('DB_PORT'),
                username : configService.get('DB_USERNAME'),
                password : configService.get('DB_PASSWORD'),
                database : configService.get('DB_NAME'),
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
