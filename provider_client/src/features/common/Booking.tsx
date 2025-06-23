import { useSignal, viewport } from '@telegram-apps/sdk-react';
import { useNavigate, useParams } from 'react-router';
import {
  Button,
  Cell,
  FixedLayout,
  List,
  NavigationCell,
  Section,
  Title,
} from 'tmaui';
import {
  useDeleteBookingMutation,
  useGetBookingQuery,
} from '../../api/bookingsApi';
import dayjs from 'dayjs';

export const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);

  const { data: booking } = useGetBookingQuery({ bookingId: +id! });
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();

  console.log('id', id);
  console.log('booking', booking);

  const goToService = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const goToClient = (clientId: number) => {
    // navigate(`/provider/${providerId}`);
  };

  const handleDeleteBooking = async (bookingId: number) => {
    const res = await deleteBooking({ id: bookingId }).unwrap();

    if (res) {
      navigate('/bookings');
    }
  };

  return (
    <List>
      <Title>Страница бронирования</Title>
      <Section header={'Информация о бронировании'}>
        <Cell subtitle={'Название услуги'}>{booking?.service.title}</Cell>
        <Cell subtitle={'Дата бронирования'}>
          {booking &&
            dayjs.unix(booking.appointment_date).format('DD.MM.YYYY HH:mm')}
        </Cell>
        <Cell subtitle={'Цена'}>{booking?.service.price} BYN</Cell>
        <NavigationCell>Профиль клиента</NavigationCell>
        <NavigationCell>Перейти к услуге</NavigationCell>
      </Section>
      <FixedLayout
        vertical="bottom"
        style={{ padding: '16px', paddingBottom: `${safeAreaBottom + 8}px` }}
      >
        <Button
          size="l"
          stretched
          mode="gray"
          loading={isDeleting}
          onClick={() => handleDeleteBooking(+id!)}
        >
          Отменить бронирование
        </Button>
      </FixedLayout>
    </List>
  );
};
