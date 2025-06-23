import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserFavorite } from '../favorites/favorite.entity';
import { ServiceReview } from 'src/reviews/review.entity';

import { Booking } from 'src/bookings/booking.entity';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column()
  first_name?: string;

  @Column()
  last_name?: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  photo_url?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => UserFavorite, (favorite) => favorite.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  favorites: UserFavorite[];

  @OneToMany(() => ServiceReview, (serviceReviews) => serviceReviews.user)
  reviews: ServiceReview[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class UserDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  photo_url?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt?: Date;
}

export class CreateUserDto extends UserDto {}
export class UpdateUserDto extends PartialType(UserDto) {
  @IsInt()
  id: number;
}
