import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateServiceDto,
  DeleteServiceDto,
  GetServicesQueryDto,
  Service,
  ServiceWithProviderAndReviewsDto,
  UpdateServiceDto,
} from './service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async getServices(filter: GetServicesQueryDto) {
    const query = this.serviceRepository.createQueryBuilder('service');

    if (filter.providerId) {
      query.andWhere('service.providerId = :providerId', {
        providerId: filter.providerId,
      });
    }

    if (filter.name) {
      query.andWhere('service.title ILIKE :name', { name: `%${filter.name}%` });
    }

    if (filter.category) {
      query.andWhere('service.category = :category', {
        category: filter.category,
      });
    }

    if (filter.minPrice) {
      query.andWhere('service.price >= :minPrice', {
        minPrice: Number(filter.minPrice),
      });
    }

    if (filter.maxPrice) {
      query.andWhere('service.price <= :maxPrice', {
        maxPrice: Number(filter.maxPrice),
      });
    }

    return await query.getMany();
  }

  async getService(serviceId: number) {
    const serviceWithProviderAndReviews = await this.serviceRepository.findOne({
      where: { id: serviceId },
      relations: ['reviews', 'provider', 'reviews.user'],
    });

    if (!serviceWithProviderAndReviews) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }

    const serviceReviewMark =
      serviceWithProviderAndReviews.reviews.length > 0
        ? serviceWithProviderAndReviews.reviews.reduce(
            (sum, review) => sum + review.value,
            0,
          ) / serviceWithProviderAndReviews.reviews.length
        : 0;

    return {
      ...serviceWithProviderAndReviews,
      serviceReviewMark: serviceReviewMark,
    };
  }

  async createService(serviceData: CreateServiceDto) {
    const newService = this.serviceRepository.create(serviceData);

    return this.serviceRepository.save(newService);
  }

  async updateService(serviceData: UpdateServiceDto) {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceData.id },
    });

    if (!service) {
      throw new NotFoundException(
        `Service with id ${serviceData.id} not found`,
      );
    }

    Object.assign(service, serviceData);

    return await this.serviceRepository.save(service);
  }

  async deleteService(serviceData: DeleteServiceDto) {
    return await this.serviceRepository.delete({ id: serviceData.id });
  }
}
