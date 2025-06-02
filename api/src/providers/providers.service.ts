import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProviderDto,
  Provider,
  ProviderDto,
  UpdateProviderDto,
} from './provider.entity';
import { Repository } from 'typeorm';
import { Update } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async getProvider(providerId: number) {
    return await this.providerRepository.findOne({ where: { id: providerId } });
  }

  async createProvider(providerData: CreateProviderDto) {
    return this.providerRepository.save(providerData);
  }

  async updateProvider(providerData: UpdateProviderDto) {
    const provider = await this.providerRepository.findOne({
      where: { id: providerData.id },
    });

    if (!provider) {
      throw new NotFoundException(
        `Service with id ${providerData.id} not found`,
      );
    }

    Object.assign(provider, providerData);

    return await this.providerRepository.save(provider);
  }

  async getProviderServices(providerId: number) {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId },
      relations: {
        services: true,
      },
    });

    return provider.services;
  }
}
