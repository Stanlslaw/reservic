export type ServiceReviewDto = {
  id: number;
  userId: number;
  serviceId: number;
  text?: string;
  value: number;

  createdAt: Date;
  updatedAt: Date;
};
