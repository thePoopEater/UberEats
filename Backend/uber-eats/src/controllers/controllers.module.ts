import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { LocalController } from './local/local.controller';

@Module({
    imports:[],
    controllers: [UserController, LocalController],
    providers:[]
})
export class ControllersModule {}
