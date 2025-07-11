import { Injectable } from '@nestjs/common';
import { UserFavorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserFavoritesService {
  constructor(
    @InjectRepository(UserFavorite)
    private usersFavoriteRepository: Repository<UserFavorite>,
  ) {}

  async getFavorites(userId: number) {
    return await this.usersFavoriteRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        service: true,
      },
    });
  }

  async addToFavorite(userId: number, serviceId: number) {
    const existing = await this.usersFavoriteRepository.findOne({
      where: {
        user: { id: userId },
        service: { id: serviceId },
      },
    });

    if (existing) {
      return existing;
    }

    const favorite = this.usersFavoriteRepository.create({
      user: { id: userId },
      service: { id: serviceId },
    });

    return await this.usersFavoriteRepository.save(favorite);
  }

  async deleteFromFavorite(favoriteId: number) {
    const favorite = await this.usersFavoriteRepository.findOne({
      where: {
        id: favoriteId,
      },
    });

    if (!favorite) {
      return null;
    }

    return await this.usersFavoriteRepository.remove(favorite);
  }
}
