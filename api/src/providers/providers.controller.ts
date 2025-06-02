import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProviderDto, UpdateProviderDto } from './provider.entity';
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get(':id')
  async getProvider(@Param('id') id: number): Promise<ProviderDto> {
    try {
      return await this.providersService.getProvider(+id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Post('create')
  async createProvider(
    @Body() providerData: ProviderDto,
  ): Promise<ProviderDto> {
    try {
      return await this.providersService.createProvider(providerData);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Post('/update')
  async updateProvider(@Body() providerData: UpdateProviderDto) {
    try {
      return await this.providersService.updateProvider(providerData);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Get('/services')
  async getProviderServices(@Param('id') id: number) {
    try {
      return await this.providersService.getProviderServices(+id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
