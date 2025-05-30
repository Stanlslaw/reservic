import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProviderDto } from 'src/dto/provider';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get(':id')
  async getProvider(@Param('id') id: number) {
    try {
      return await this.providersService.getProvider(+id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Post('create')
  async createProvider(@Body() providerData: ProviderDto) {
    try {
      return await this.providersService.createProvider(providerData);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Post(':id/update')
  async updateProvider(
    @Param('id') id: number,
    @Body() providerData: ProviderDto,
  ) {
    try {
      return await this.providersService.updateProvider(+id, providerData);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Get(':id/services')
  async getProviderServices(@Param('id') id: number) {
    try {
      return await this.providersService.getProviderServices(+id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
