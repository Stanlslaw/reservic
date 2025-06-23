import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import {
  BookingDto,
  CreateBookingDto,
  DeleteBookingDto,
  GetAvailableSlotsDto,
  GetAvailableSlotsQueryDto,
  GetBookingsDto,
  GetBookingsQueryDto,
  UpdateBookingDto,
} from './booking.entity';

@ApiSecurity('tma-auth')
@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  @ApiOkResponse({ type: GetAvailableSlotsDto })
  @Get('/slots')
  async getAvailableSlots(@Query() query: any) {
    console.log('slots');
    console.log(query);
    return await this.bookingService.getAvailableSlots(query);
  }

  @ApiOkResponse({ type: BookingDto })
  @Get('/id/:bookingId')
  async getBooking(@Param('bookingId') bookingId: number) {
    return await this.bookingService.getBooking(+bookingId);
  }

  @ApiExtraModels(GetBookingsQueryDto)
  @ApiQuery({ type: GetBookingsQueryDto })
  @ApiOkResponse({ type: GetBookingsDto })
  @Get('/')
  async getBookings(@Query() query: any) {
    console.log(query);
    return await this.bookingService.getBookings(query);
  }

  @ApiOkResponse({ type: BookingDto })
  @Post('/create')
  async createBooking(@Body() bookingData: CreateBookingDto) {
    console.log(bookingData);
    return await this.bookingService.createBooking(bookingData);
  }

  @ApiOkResponse({ type: BookingDto })
  @Post('/update')
  async updateBooking(@Body() bookingData: UpdateBookingDto) {
    return await this.bookingService.updateBooking(bookingData);
  }

  @ApiOkResponse({ type: BookingDto })
  @Post('/delete')
  async deleteBooking(@Body() bookingData: DeleteBookingDto) {
    return await this.bookingService.deleteBooking(bookingData);
  }
}
