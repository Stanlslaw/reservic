import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, User } from './user.entity';
import { Repository } from 'typeorm';
import { type User as TgUser } from '@telegram-apps/init-data-node';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async createUser(user: CreateUserDto) {
    const userEntity = this.usersRepository.create(user);

    return await this.usersRepository.save(userEntity);
  }

  async updateUser(user: UpdateUserDto) {
    const userEntity = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    if (!userEntity) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }

    Object.assign(userEntity, user);

    return await this.usersRepository.update({ id: user.id }, user);
  }

  async isExist(id: number) {
    return await this.usersRepository.exists({ where: { id } });
  }

  tgUserToUserDto(user: TgUser): Partial<User> {
    return {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      photo_url: user.photo_url,
    };
  }
}
