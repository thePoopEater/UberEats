import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from "src/database/entities/user.entity";
import { UserService } from 'src/providers/user/user.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory:(configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions:{expiresIn:'15m'}
    }),
    inject: [ConfigService]
}),TypeOrmModule.forFeature([UserEntity])], 
  
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
