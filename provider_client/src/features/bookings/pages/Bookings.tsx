import { Cell, List, Section, SegmentedControl, Tappable, Title } from 'tmaui';
import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { initData, useSignal } from '@telegram-apps/sdk-react';
import { useGetBookingsQuery } from '../../../api/bookingsApi';
import dayjs from 'dayjs';

export const Bookings = () => {
  const navigate = useNavigate();
  const [bookingMode, setBookingMode] = useState<'upcoming' | 'history'>(
    'upcoming',
  );

  const user = useSignal(initData.user);

  const { data: bookings, refetch } = useGetBookingsQuery({
    providerId: +user!.id,
  });

  const handleGoToBooking = (bookingId: number) => {
    navigate(`./${bookingId}`);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <List>
      <Title>Список заказов</Title>
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
      <Section header={'Заказы на услуги'}>
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
                Заказы отсутствуют
              </Title>
            )}
          </Section>
        ) : (
          <Section></Section>
        )}
      </Section>
    </List>
  );
};
