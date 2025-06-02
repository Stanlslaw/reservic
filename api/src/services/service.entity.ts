import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';
import { Booking } from 'src/bookings/booking.entity';
import { Provider } from 'src/providers/provider.entity';
import { ServiceReview } from 'src/reviews/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { array: true })
  photo_urls: string[];

  @Column()
  duration: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  status: 'active' | 'deleted' | 'stopped';

  @Column('text', { array: true })
  days_of_week: string[];

  @Column()
  category: string;

  @OneToMany(() => ServiceReview, (review) => review.service)
  reviews: ServiceReview[];

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings: Booking[];

  @ManyToOne(() => Provider, (provider) => provider.services)
  @JoinColumn()
  provider: Provider;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class ServiceDto {
  @IsInt()
  id: number;
  @IsInt()
  providerId: number;
  @IsString()
  title: string;
  @IsArray()
  photo_urls: string[];
  @IsString()
  duration: number;
  @IsInt()
  start_time: number;
  @IsInt()
  end_time: number;
  @IsString()
  category: string;
  @IsArray()
  days_of_week: string[];
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsString()
  status: 'active' | 'deleted' | 'stopped';
}

export class CreateServiceDto extends OmitType(ServiceDto, ['id'] as const) {}

export class UpdateServiceDto extends PartialType(ServiceDto) {
  @IsInt()
  id: number;

  @IsInt()
  providerId: number;
}

export class DeleteServiceDto extends PickType(ServiceDto, [
  'id',
  'providerId',
] as const) {}
