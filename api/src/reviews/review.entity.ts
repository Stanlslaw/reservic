import { Service } from 'src/services/service.entity';
import { User } from 'src/users/user.entity';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty, OmitType } from '@nestjs/swagger';

@Entity()
export class ServiceReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  text?: string;

  @Column()
  value: number;

  @ManyToOne(() => Service, (service) => service.reviews)
  @JoinColumn()
  service: Service;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class ServiceReviewDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty()
  @IsInt()
  value: number;

  @ApiProperty()
  @IsInt()
  serviceId: number;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}

export class CreateServiceReviewDto extends OmitType(ServiceReviewDto, [
  'id',
]) {}
