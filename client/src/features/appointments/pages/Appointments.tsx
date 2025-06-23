import {
  Caption,
  Cell,
  IconButton,
  Input,
  List,
  Section,
  SegmentedControl,
  Tappable,
  Title,
} from 'tmaui';
import dayjs from 'dayjs';
import { useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { useGetBookingsQuery } from '../../../api/bookingsApi';
import { initData, useSignal } from '@telegram-apps/sdk-react';

export const Appointments = () => {
  const [bookingMode, setBookingMode] = useState<'upcoming' | 'history'>(
    'upcoming',
  );

  const user = useSignal(initData.user);

  const { data: bookings } = useGetBookingsQuery({ userId: +user!.id });

  const navigate = useNavigate();

  const handleGoToBooking = (bookingId: number) => {
    navigate(`/bookings/${bookingId}`);
  };

  return (
    <List>
      <Title>Список бронирований</Title>
      <SegmentedControl>
        <SegmentedControl.Item
          selected={bookingMode === 'upcoming'}
          onClick={() => setBookingMode('upcoming')}
        >
          Будущие
        </SegmentedControl.Item>
        <SegmentedControl.Item
          selected={bookingMode === 'history'}
          onClick={() => setBookingMode('history')}
        >
          Прошлые
        </SegmentedControl.Item>
      </SegmentedControl>
      {bookingMode === 'upcoming' ? (
        <Section>
          {bookings && bookings.length ? (
            bookings.map(booking => (
              <Cell
                multiline
                after={
                  <Tappable onClick={() => handleGoToBooking(booking.id)}>
                    <IoChevronForward size={32} />
                  </Tappable>
                }
                description={`${dayjs.unix(booking.appointment_date).format('DD.MM.YYYY HH:mm')}\n${booking.service.duration} мин\n25 BYN`}
              >
                {booking.service.title}
              </Cell>
            ))
          ) : (
            <Title style={{ textAlign: 'center', padding: '12px 0' }}>
              Бронирования отсутствуют
            </Title>
          )}
        </Section>
      ) : (
        <Section></Section>
      )}
      {/* <div
        style={{
          width: '100%',
          display: 'flex',
          gap: 8,
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Input
            placeholder="Поиск"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            after={
              <Tappable
                style={{ display: 'flex' }}
                Component={'div'}
                onClick={() => setSearchText('')}
              >
                <IoCloseOutline />
              </Tappable>
            }
          />
        </div>
        <IconButton mode="outline" size="m">
          <IoFilterOutline size={24} />
        </IconButton>
      </div>
      <div></div> */}
    </List>
  );
};
