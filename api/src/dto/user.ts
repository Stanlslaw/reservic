export type UserDto = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  photo_url?: string;

  createdAt: Date;
  updatedAt: Date;
};
