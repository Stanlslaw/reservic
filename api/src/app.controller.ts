import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Check if app is healthy' })
  @ApiResponse({ status: 200, description: 'The service is up and running.' })
  @Get('/health-check')
  test() {
    return this.appService.test();
  }
}
