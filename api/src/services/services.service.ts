import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateServiceDto,
  DeleteServiceDto,
  Service,
  UpdateServiceDto,
} from './service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async getService(serviceId: number) {
    return await this.serviceRepository.findOne({ where: { id: serviceId } });
  }

  async getServices() {}

  async createService(serviceData: CreateServiceDto) {
    const isExistWithTheSameTitle = this.serviceRepository.exists({
      where: { title: serviceData.title },
    });

    if (isExistWithTheSameTitle) {
      throw new NotFoundException(
        `Service with title ${serviceData.title} already exists`,
      );
    }

    // const newService = this.serviceRepository.create(serviceData);

    // return this.serviceRepository.save(newService);
  }

  async updateService(serviceId: number, serviceData: UpdateServiceDto) {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }

    Object.assign(service, serviceData);

    return await this.serviceRepository.save(service);
  }

  async deleteService(serviceData: DeleteServiceDto) {
    return await this.serviceRepository.delete({ id: serviceData.id });
  }
}
