import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from 'src/services/service.entity';
import { IsInt } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

@Entity()
export class UserFavorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class UserFavoriteDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  serviceId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  userId: number;
}

export class CreateUserFavoriteDto extends OmitType(UserFavoriteDto, ['id']) {}

export class DeleteUserFavoriteDto extends PickType(UserFavoriteDto, ['id']) {}
