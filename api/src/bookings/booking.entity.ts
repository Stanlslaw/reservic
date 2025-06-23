import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Service, ServiceDto } from 'src/services/service.entity';
import { User, UserDto } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: 'active' | 'declined';

  @Column({ type: 'bigint' })
  appointment_date: number;

  @ManyToOne(() => Service, { eager: true })
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @Column()
  serviceId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class BookingDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ enum: ['active', 'declined'] })
  @IsEnum(['active', 'declined'])
  status: 'active' | 'declined';

  @ApiProperty({ example: 1717286400, description: 'Unix timestamp (seconds)' })
  @IsInt()
  appointment_date: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  serviceId: number;

  @ApiProperty({ example: 12 })
  @IsInt()
  userId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt?: Date;
}

export class BookingWithUserAndServiceDto extends BookingDto {
  @ApiProperty()
  user: UserDto;
  @ApiProperty()
  service: ServiceDto;
}

export class CreateBookingDto extends OmitType(BookingDto, ['id'] as const) {}
export class UpdateBookingDto extends PickType(BookingDto, [
  'id',
  'appointment_date',
] as const) {}

export class DeleteBookingDto extends PickType(BookingDto, ['id'] as const) {}

export class GetAvailableSlotsQueryDto {
  @ApiProperty({ required: true })
  serviceId: number;
  @ApiProperty({ required: true })
  date: number;
}

export class GetAvailableSlotsDto {
  @ApiProperty({ required: true })
  appointment_dates: AppointmentData[];
}

export type AppointmentData = {
  isAvailable: boolean;
  time: number;
};

export class GetBookingsQueryDto {
  @ApiProperty({
    required: false,
    description: 'Фильтр по ID пользователя',
    example: 1,
  })
  @IsOptional()
  userId?: number;

  @ApiProperty({
    required: false,
    description: 'Фильтр по ID провайдера',
    example: 2,
  })
  @IsOptional()
  providerId?: number;

  @ApiProperty({
    required: false,
    description: 'Получить только последние бронирования',
    example: true,
  })
  @IsOptional()
  isLast?: boolean;
}
export class GetBookingsDto {
  @ApiProperty()
  @IsOptional()
  bookings: BookingWithUserAndServiceDto[];
}
