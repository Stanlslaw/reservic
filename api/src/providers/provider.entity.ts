import { IsOptional, IsString } from 'class-validator';
import { Service } from 'src/services/service.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  header_picture_url?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];

  @OneToOne(() => User, (user) => user.provider)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class CreateProviderDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  header_picture_url?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProviderDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  header_picture_url?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
