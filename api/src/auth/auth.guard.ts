import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  validate,
  parse,
  type InitData,
  isValid,
} from '@telegram-apps/init-data-node';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const botToken = this.configService.get<string>('BOT_TOKEN');
    const botProviderToken =
      this.configService.get<string>('BOT_PROVIDER_TOKEN');
    const request = context.switchToHttp().getRequest();
    const authData = this.extractAuthDataFromHeader(request);

    console.log(authData);

    if (!authData) {
      throw new UnauthorizedException();
    }
    try {
      const isBotTokenValid = isValid(authData, botToken);
      const isBotProviderTokenValid = isValid(authData, botProviderToken);
      if (!(isBotProviderTokenValid || isBotTokenValid)) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }

    request['initData'] = parse(authData);
    return true;
  }

  private extractAuthDataFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'tma' ? token : undefined;
  }
}
