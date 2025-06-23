import { Injectable } from '@nestjs/common';
import { CreateServiceReviewDto, ServiceReview } from './review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceReviewsService {
  constructor(
    @InjectRepository(ServiceReview)
    private serviceReviewRepository: Repository<ServiceReview>,
  ) {}

  async getServiceReviews(serviceId: number) {
    return await this.serviceReviewRepository.find({
      where: {
        service: {
          id: serviceId,
        },
      },
    });
  }

  async getUserReviews(serviceId: number) {
    return await this.serviceReviewRepository.find({
      where: {
        service: {
          id: serviceId,
        },
      },
    });
  }

  async createReview(reviewData: CreateServiceReviewDto) {
    const { serviceId, userId, ...rest } = reviewData;

    const review = this.serviceReviewRepository.create({
      ...rest,
      user: { id: userId },
      service: { id: serviceId },
    });

    return await this.serviceReviewRepository.save(review);
  }
}
