import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector:Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
  
    const role= this.reflector.getAllAndOverride('roles',[
      context.getHandler(),
      context.getClass()
    ]);
    if(!role){
       return true;
    }
    //se compara que el rol del token sea igual al del usuario obteniendo los datos del request de user
    //en el payload.
    const {user} = context.switchToHttp().getRequest()
    //si el rol es admin, tiene acceso a todo.
    if(user.role === 'admin'){
      return true;
    }

    return role === user.role;
  }
}
