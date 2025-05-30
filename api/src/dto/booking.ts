export type BookingDto = {
  id: number;
  userId: number;
  serviceId: number;
  status: string;
  appointment_date: Date;

  createdAt: Date;
  updatedAt: Date;
};
