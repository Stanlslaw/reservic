import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsController } from './bookings.controller';
import { Service } from 'src/services/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Service])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
