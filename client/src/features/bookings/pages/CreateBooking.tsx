import { DatePicker } from '@mui/x-date-pickers';
import { initData, useSignal, viewport } from '@telegram-apps/sdk-react';
import { useNavigate, useParams } from 'react-router';
import { Button, Cell, Chip, FixedLayout, List, Section, Title } from 'tmaui';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  useCreateBookingMutation,
  useGetAvailableSlotsQuery,
  useGetBookingsQuery,
} from '../../../api/bookingsApi';
import { useGetServiceQuery } from '../../../api/servicesApi';
import { formatMinutes } from '../../../utils/format';

export const CreateBooking = () => {
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);
  const { serviceId } = useParams();
  const { data: service } = useGetServiceQuery({ serviceId: +serviceId! });
  const user = useSignal(initData.user);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().startOf('day').unix(),
  );
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const {
    data: times,
    isLoading: isSlotsLoading,
    refetch,
    error,
  } = useGetAvailableSlotsQuery({
    serviceId: +serviceId!,
    date: selectedDate,
  });

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  console.log(times);

  useEffect(() => {
    refetch();
  }, [selectedDate]);

  const handleCreateBooking = async () => {
    if (selectedTime) {
      const timestamp = dayjs
        .unix(selectedDate) // используем dayjs.unix() для секунд
        .add(selectedTime, 'minute')
        .unix();

      const result = await createBooking({
        status: 'active',
        serviceId: +serviceId!,
        userId: +user!.id,
        appointment_date: timestamp,
      }).unwrap();

      if (result) {
        navigate('/appointments');
      }
    }
  };

  return (
    <List>
      <Title>Создание бронирования</Title>
      <Section header="Данные услуги">
        <Cell subtitle={'Название услуги'}>{service?.title}</Cell>
        <Cell subtitle={'Цена'}>{service?.price} BYN</Cell>
        <Cell subtitle={'Длительность'}>{service?.duration} мин</Cell>
      </Section>

      <Section header={'Выберите день'}>
        <DatePicker
          minDate={dayjs().startOf('day')}
          format="DD.MM.YYYY"
          value={dayjs.unix(selectedDate)}
          onChange={newValue => {
            if (newValue) {
              const startOfDayUnix = dayjs(newValue).startOf('day').unix(); // в секундах

              setSelectedDate(startOfDayUnix); // если хочешь сохранить исходное значение
            }
          }}
          shouldDisableDate={date => {
            const dayOfWeek = date.day(); // 0 - воскресенье, 1 - понедельник и т.д.
            // Разрешаем только те дни, которые есть в available_dates
            return !service?.days_of_week.includes(dayOfWeek as number);
          }}
        />
      </Section>

      <Section
        style={{ marginBottom: `${safeAreaBottom + 120}px` }}
        header="Выберите доступное время"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px 24px',
            padding: '16px',
          }}
        >
          {times?.appointment_dates.map(({ time, isAvailable }) => (
            <Chip
              key={time}
              mode="outline"
              onClick={() => isAvailable && setSelectedTime(time)}
              style={{
                background:
                  time === selectedTime
                    ? 'blue'
                    : isAvailable
                      ? 'white'
                      : 'red',
                borderWidth: '2px',
              }}
            >
              {formatMinutes(time)}
            </Chip>
          ))}
        </div>
      </Section>

      <FixedLayout
        vertical="bottom"
        style={{ padding: '16px', paddingBottom: `${safeAreaBottom + 8}px` }}
      >
        <Button
          size="l"
          stretched
          onClick={handleCreateBooking}
          disabled={isLoading}
        >
          {isLoading ? 'Сохраняем...' : 'Подтвердить'}
        </Button>
      </FixedLayout>
    </List>
  );
};
