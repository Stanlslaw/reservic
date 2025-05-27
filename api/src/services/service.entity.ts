import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @Column()
  photo_url: string;

  @Column()
  duration: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  status: 'active' | 'hidden';

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

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  photo_url: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['active', 'hidden'])
  status: 'active' | 'hidden';

  @IsString()
  @IsNotEmpty()
  category: string;
}

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  photo_url: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  price: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(['active', 'hidden'])
  status: 'active' | 'hidden';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category: string;
}

export class DeleteServiceDto {
  @IsInt()
  id: number;
}
