import { Injectable } from '@nestjs/common';
import { CreateReviewDto, ServiceReview } from './review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ServiceReview)
    private serviceReviewRepository: Repository<ServiceReview>,
  ) {}

  async getReviews(serviceId: number) {
    return await this.serviceReviewRepository.find({
      where: {
        service: {
          id: serviceId,
        },
      },
    });
  }

  async createReview(userId: number, reviewData: CreateReviewDto) {
    const { serviceId, ...rest } = reviewData;

    const review = this.serviceReviewRepository.create({
      ...rest,
      user: { id: userId },
      service: { id: serviceId },
    });

    return await this.serviceReviewRepository.save(review);
  }
}
