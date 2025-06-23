import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ServiceReview } from './review.entity';
import { ReviewsController } from './reviews.controller';
import { ServiceReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceReview])],
  providers: [ServiceReviewsService],
  exports: [ServiceReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
