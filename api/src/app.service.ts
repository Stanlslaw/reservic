import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  test() {
    return { status: 200, description: 'The service is up and running.' };
  }
}
