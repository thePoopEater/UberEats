import { Module } from '@nestjs/common';
import { LocalController } from './local/local.controller';

@Module({
    imports: [],
    controllers:[LocalController],
    providers:[]
})
export class ControllersModule {}
