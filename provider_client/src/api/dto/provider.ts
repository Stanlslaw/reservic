export type ProviderDto = {
  id: number;
  name: string;
  username: string;
  phone_number?: string;
  address?: string;
  description?: string;
  picture_url?: string;

  createdAt?: Date;
  updatedAt?: Date;
};
