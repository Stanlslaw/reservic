import { IsInt, IsOptional, IsString } from 'class-validator';

export type ProviderDtoType = {
  id: number;
  name: string;
  username: string;
  phone_number?: string;
  address?: string;
  description?: string;
  picture_url?: string;

  createdAt: Date;
  updatedAt: Date;
};

export class ProviderDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  picture_url?: string;
}
