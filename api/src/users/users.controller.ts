import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.entity';

import { ApiOkResponse, ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('tma-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UserDto })
  @Get(':userId')
  async getUser(@Param('userId') userId: number) {
    return await this.usersService.getUser(+userId);
  }

  @ApiOkResponse({ type: UserDto })
  @Post('create')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.usersService.createUser(userData);
  }

  @ApiOkResponse({ type: UserDto })
  @Post('update')
  async updateUser(@Body() userData: UpdateUserDto) {
    return await this.usersService.updateUser(userData);
  }
}
