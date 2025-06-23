import {
  CreateServiceReviewDto,
  ServiceReviewDto,
} from 'src/reviews/review.entity';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity } from '@nestjs/swagger';
import { ServiceReviewsService } from './reviews.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiSecurity('tma-auth')
@UseGuards(AuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly serviceReviewService: ServiceReviewsService) {}

  @ApiOkResponse({ type: ServiceReviewDto })
  @Post('/create')
  async createServiceReview(@Body() reviewData: CreateServiceReviewDto) {
    return await this.serviceReviewService.createReview(reviewData);
  }
}
