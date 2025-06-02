import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { InitData } from '@telegram-apps/init-data-node';
import { User } from './user.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import {
  CreateUserFavoriteDto,
  DeleteUserFavoriteDto,
} from 'src/favorites/favorite.entity';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly favoriteService: FavoritesService,
    private readonly reviewService: ReviewsService,
  ) {}

  @Get(':id')
  async getUser(@Req() req: { initData: InitData }, @Param('id') id: number) {
    try {
      const initData = req.initData;
      const user = initData.user;

      const isExist = await this.usersService.isExist(+id);

      if (!isExist) {
        await this.usersService.create(user);
      }

      if (isExist) {
        await this.usersService.update(
          this.usersService.tgUserToUserDto(user),
          id,
        );
      }

      const dbUser = await this.usersService.get(+id);
      return { user: dbUser };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id/update')
  async updateUser(@Body() user: Partial<User>, @Param('id') id: number) {
    try {
      const result = this.usersService.update(user, +id);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id/favorites')
  async getFavorites(@Param() id: number) {
    try {
      return this.favoriteService.getFavorites(+id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id/favorites/add')
  async addFavorite(
    @Param('id') id: number,
    @Body() body: CreateUserFavoriteDto,
  ) {
    try {
      return await this.favoriteService.addFavorite(+id, body.serviceId);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id/favorites/remove')
  async removeFavorite(
    @Param('id') id: number,
    @Body() body: DeleteUserFavoriteDto,
  ) {
    try {
      return await this.favoriteService.removeFavorite(body.id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
