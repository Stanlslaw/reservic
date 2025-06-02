import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Service } from 'src/services/service.entity';
import { User } from 'src/users/user.entity';
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

  @Column()
  appointment_date: number;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn()
  service: Service;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn()
  user: User;

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
