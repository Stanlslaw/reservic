import { Injectable } from '@nestjs/common';
import { UserFavorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
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

  async addFavorite(userId: number, serviceId: number) {
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

  async removeFavorite(userId: number, serviceId: number) {
    const favorite = await this.usersFavoriteRepository.findOne({
      where: {
        user: { id: userId },
        service: { id: serviceId },
      },
    });

    if (!favorite) {
      return null;
    }

    return await this.usersFavoriteRepository.remove(favorite);
  }
}
