import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { Repository } from 'typeorm';
import { ProviderDto } from 'src/dto/provider';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async getProvider(providerId: number) {
    return await this.providerRepository.findOne({ where: { id: providerId } });
  }

  async createProvider(providerData: ProviderDto) {
    return this.providerRepository.save(providerData);
  }

  async updateProvider(providerId: number, providerData: ProviderDto) {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId },
    });

    if (!provider) {
      throw new NotFoundException(`Service with id ${providerId} not found`);
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
