import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              type: 'mysql',
              host: configService.get('DB_HOST'),
              port: parseInt(configService.get('DB_PORT')),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_NAME'),
              entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
              synchronize: true,
              autoLoadEntities: true,
            }),
            inject:[ConfigService]
          }),
    ],
    exports: [],
    providers:[]
})
export class DatabaseModule {}
