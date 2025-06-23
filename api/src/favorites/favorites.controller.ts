import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  CreateUserFavoriteDto,
  DeleteUserFavoriteDto,
  UserFavoritesWithService,
} from './favorite.entity';
import { ApiOkResponse, ApiSecurity } from '@nestjs/swagger';
import { UserFavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiSecurity('tma-auth')
@UseGuards(AuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly userFavoritesService: UserFavoritesService) {}

  @ApiOkResponse({ type: [UserFavoritesWithService] })
  @Get(':userId')
  async getFavorites(@Param('userId') userId: number) {
    console.log(userId);
    return this.userFavoritesService.getFavorites(+userId);
  }

  @ApiOkResponse({ type: [UserFavoritesWithService] })
  @Post('add')
  async addFavorite(@Body() userFavoriteData: CreateUserFavoriteDto) {
    console.log(userFavoriteData);
    return await this.userFavoritesService.addToFavorite(
      userFavoriteData.userId,
      userFavoriteData.serviceId,
    );
  }

  @ApiOkResponse({ type: [UserFavoritesWithService] })
  @Post('delete')
  async removeFavorite(@Body() userFavoriteData: DeleteUserFavoriteDto) {
    console.log(userFavoriteData);
    return await this.userFavoritesService.deleteFromFavorite(
      userFavoriteData.id,
    );
  }
}
