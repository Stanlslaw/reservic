import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Booking } from 'src/bookings/booking.entity';
import { Provider, ProviderDto } from 'src/providers/provider.entity';
import { ServiceReview, ServiceReviewDto } from 'src/reviews/review.entity';
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

  @Column({ nullable: true })
  photo_url?: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column()
  start_time: number;

  @Column()
  end_time: number;

  @Column()
  price: number;

  @Column()
  status: 'active' | 'deleted' | 'stopped';

  @Column('int', { array: true })
  days_of_week: number[];

  @Column()
  category: string;

  @OneToMany(() => ServiceReview, (review) => review.service, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reviews: ServiceReview[];

  @OneToMany(() => Booking, (booking) => booking.service, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bookings: Booking[];

  @Column()
  providerId: number;

  @ManyToOne(() => Provider, (provider) => provider.services)
  @JoinColumn({ name: 'providerId' })
  provider: Provider;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class ServiceDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  providerId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  photo_url?: string;

  @ApiProperty()
  @IsInt()
  duration: number;

  @ApiProperty()
  @IsInt()
  start_time: number;

  @ApiProperty()
  @IsInt()
  end_time: number;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty({ type: [String] })
  @IsIn([0, 1, 2, 3, 4, 5, 6, 7], { each: true })
  @IsArray()
  days_of_week: number[];

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ enum: ['active', 'deleted', 'stopped'] })
  @IsString()
  status: 'active' | 'deleted' | 'stopped';

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt?: Date;
}

export class ServiceWithProviderDto extends OmitType(ServiceDto, [
  'providerId',
] as const) {
  @ApiProperty({ type: () => ProviderDto })
  provider: ProviderDto;
}

export class ServiceWithProviderAndReviewsDto extends ServiceWithProviderDto {
  @ApiProperty({ type: () => ProviderDto })
  provider: ProviderDto;

  @ApiProperty({ type: [ServiceReviewDto] })
  @IsInt()
  reviews: ServiceReviewDto[];
  @ApiProperty()
  @IsInt()
  serviceReviewMark: number;
}

export class CreateServiceDto extends OmitType(ServiceDto, ['id'] as const) {}

export class UpdateServiceDto extends PartialType(ServiceDto) {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  providerId: number;
}

export class DeleteServiceDto extends PickType(ServiceDto, [
  'id',
  'providerId',
] as const) {}

export class GetServicesQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  providerId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  maxPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  minPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  category?: string;
}
