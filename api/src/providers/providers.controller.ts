import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import {
  CreateProviderDto,
  DeleteProviderDto,
  ProviderDto,
  UpdateProviderDto,
} from './provider.entity';
import { ApiOkResponse, ApiSecurity } from '@nestjs/swagger';
import { ServiceDto } from 'src/services/service.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiSecurity('tma-auth')
@UseGuards(AuthGuard)
@Controller('provider')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiOkResponse({ type: ProviderDto })
  @Get(':id')
  async getProvider(@Param('id') id: number) {
    return await this.providersService.getProvider(+id);
  }

  @ApiOkResponse({ type: CreateProviderDto })
  @Post('create')
  async createProvider(@Body() providerData: CreateProviderDto) {
    return await this.providersService.createProvider(providerData);
  }

  @ApiOkResponse({ type: ProviderDto })
  @Post('/update')
  async updateProvider(@Body() providerData: UpdateProviderDto) {
    return await this.providersService.updateProvider(providerData);
  }
}
