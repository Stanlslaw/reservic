import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { type User as TgUser } from '@telegram-apps/init-data-node';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async get(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async create(user: TgUser) {
    return await this.usersRepository.save(this.tgUserToUserDto(user));
  }

  async update(user: Partial<User>, id: number) {
    return await this.usersRepository.update({ id: id }, user);
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
