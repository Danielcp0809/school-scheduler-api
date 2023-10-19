import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('ENVIRONMENT') private environment: string) {}

  getHello(): string {
    return 'Hello World!!' + this.environment;
  }
}
