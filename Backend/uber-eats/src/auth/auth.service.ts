import { Injectable } from '@nestjs/common';
import { UserService } from 'src/providers/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ){}

    async register(data: RegisterDTO){
        const {password} = data;
        const toHash= await hash(password, 10);
        data = { ...data, password: toHash };
        return this.userService.register(data)
    }
    async validateUser(username: string, password: string){
        const user = await this.userService.findByUsername(username);
        if (user && await compare(password, user.password)) {
            return user;
    } return null;
}
    async login (user: any){
        const payload= {username:user.username, sub: user.id}
        return{
            access_token:this.jwtService.sign(payload),
    };
}
}
