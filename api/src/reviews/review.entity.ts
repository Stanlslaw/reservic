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

export class CreateReviewDto {
  @IsInt()
  serviceId: number;

  @IsOptional()
  @IsString()
  text?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  value: number;
}
