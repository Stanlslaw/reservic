import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Booking,
  BookingDto,
  CreateBookingDto,
  DeleteBookingDto,
  GetAvailableSlotsDto,
  GetAvailableSlotsQueryDto,
  GetBookingsQueryDto,
  UpdateBookingDto,
} from './booking.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/services/service.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async getBooking(bookingId: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['service', 'user'],
    });
    if (!booking)
      throw new NotFoundException(`Booking with id ${bookingId} not found`);
    return booking;
  }

  async getBookings(query: GetBookingsQueryDto) {
    if (query.userId) {
      return await this.bookingRepository.find({
        where: { user: { id: query.userId } },
        relations: ['user', 'service'],
      });
    }

    if (query.providerId) {
      return await this.bookingRepository.find({
        where: { service: { providerId: query.providerId } },
        relations: ['user', 'service'],
      });
    }
  }

  async createBooking(bookingData: CreateBookingDto) {
    console.log(bookingData);
    const booking = this.bookingRepository.create(bookingData);

    return await this.bookingRepository.save(booking);
  }

  async updateBooking(bookingData: UpdateBookingDto) {}

  async deleteBooking(bookingData: DeleteBookingDto) {
    return await this.bookingRepository.delete({ id: bookingData.id });
  }

  async getAvailableSlots(
    query: GetAvailableSlotsQueryDto,
  ): Promise<GetAvailableSlotsDto> {
    const service = await this.serviceRepository.findOne({
      where: { id: +query.serviceId },
    });

    const dateBookings = await this.bookingRepository.find({
      where: {
        serviceId: +query.serviceId,
        appointment_date: Between(+query.date, dayjs().endOf('day').unix()),
      },
    });

    const slots = generateTimeSlots(
      service.start_time,
      service.end_time,
      service.duration,
    );

    const formattedSlots = slots.map((time) => ({
      isAvailable: true,
      time: time,
    }));

    const passedSlots = formattedSlots.map((record) => {
      if (+query.date + record.time * 60 < dayjs().unix()) {
        return { ...record, isAvailable: false };
      }
      return record;
    });

    const usedSlots = passedSlots.map((record) => {
      if (
        dateBookings.some((booking) => {
          console.log(booking.appointment_date, +query.date + record.time * 60);
          return booking.appointment_date == +query.date + record.time * 60;
        })
      ) {
        return { ...record, isAvailable: false };
      }
      return record;
    });

    return {
      appointment_dates: usedSlots,
    };
  }
}

const generateTimeSlots = (start: number, end: number, step: number) => {
  const slots = [];
  for (let i = start; i < end; i += step) {
    slots.push(i);
  }
  return slots;
};
