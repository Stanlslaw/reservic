import { Module } from '@nestjs/common';
import { UserFavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavorite } from './favorite.entity';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavorite])],
  providers: [UserFavoritesService],
  exports: [UserFavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
