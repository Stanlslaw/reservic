import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FavoritesModule, ReviewsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
