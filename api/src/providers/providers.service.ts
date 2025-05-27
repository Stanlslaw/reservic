import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProviderDto,
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
    return this.providerRepository.findOne({ where: { id: providerId } });
  }

  async createProvider(providerData: CreateProviderDto) {
    return this.providerRepository.save(providerData);
  }

  async updateProvider(providerId: number, providerData: UpdateProviderDto) {
    const service = await this.providerRepository.findOne({
      where: { id: providerId },
    });

    if (!service) {
      throw new NotFoundException(`Service with id ${providerId} not found`);
    }

    Object.assign(service, providerData);

    return await this.providerRepository.save(service);
  }
}
