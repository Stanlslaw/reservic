export type ServiceDto = {
  id: number;
  providerId: number;
  category: string;
  title: string;
  photo_urls: string[];
  duration: number;
  start_time: number;
  end_time: number;
  days_of_week: string[];
  description: string;
  price: number;
  status: 'active' | 'deleted' | 'paused';

  createdAt: Date;
  updatedAt: Date;
};
