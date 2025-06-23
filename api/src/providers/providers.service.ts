import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProviderDto,
  DeleteProviderDto,
  Provider,
  UpdateProviderDto,
} from './provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async getProvider(providerId: number) {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId },
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return provider;
  }

  async createProvider(providerData: CreateProviderDto) {
    const provider = this.providerRepository.create(providerData);
    console.log(providerData);
    return this.providerRepository.save(provider);
  }

  async deleteProvider(providerData: DeleteProviderDto) {
    const provider = this.providerRepository.create(providerData);
    console.log(providerData);
    return this.providerRepository.save(provider);
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
