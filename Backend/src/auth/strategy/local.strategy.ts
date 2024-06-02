import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    )
{ super({
    emailField:'email',  
    passworField: 'password'
});
}
async validate (email: string, password: string){
    const user= await this.authService.validateEmail(email, password);
    if(!user) {throw new UnauthorizedException('Acceso inválido');
}
return user;
}

}