import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ServiceReview } from './review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceReview])],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
