import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());
    console.log(role);
    // return true;
    if (!role) {
      return true;
    }
    console.log('guared');
    console.log(role);
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const attachedRole = request.user.role;
    console.log(attachedRole);
    if (role === attachedRole) {
      return true;
    } else {
      return false;
    }
    // return roles.some((role) => user.roles.includes(role));
  }
}
