import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config> 
  ){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    if(!authHeader){
      throw new UnauthorizedException('Missing Authorization Header');
    }
    const token = authHeader.replace('Bearer ', '');
    console.log(this.configService.apiKey)
    return token === this.configService.apiKey
  }
}
