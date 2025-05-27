import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavorite } from './favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavorite])],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
