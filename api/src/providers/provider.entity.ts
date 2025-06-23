import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Service } from 'src/services/service.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Provider {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  picture_url?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Service, (service) => service.provider, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  services: Service[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class ProviderDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString()
  picture_url?: string;

  @ApiProperty({ example: 'Experienced massage therapist', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt?: Date;
}

export class CreateProviderDto extends ProviderDto {}

export class DeleteProviderDto extends PickType(ProviderDto, ['id'] as const) {}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;
}
