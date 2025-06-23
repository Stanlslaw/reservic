import {
  Avatar,
  Button,
  Cell,
  FixedLayout,
  Image,
  List,
  Section,
  Title,
} from 'tmaui';
import { useNavigate, useParams } from 'react-router';
import { ServiceDto } from '../../api/api';
import { useSignal, viewport } from '@telegram-apps/sdk-react';
import { formatMinutes } from '../../utils/format';
import Rating from '@mui/material/Rating';
import { useGetServiceQuery } from '../../api/servicesApi';

const services: ServiceDto[] = [
  {
    id: 1,
    providerId: 1,
    title: 'Мужская стрижка',
    photo_url: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTybPsxOxruMoFuJWWCm3_a4vW98BDAdKMiPg&s',
    ],
    duration: 30,
    start_time: 480,
    end_time: 1020,
    category: 'beauty',
    days_of_week: ['everyday'],
    description: 'Лучшие стрижки в городе Кобрин',
    price: 25,
    status: 'active',
  },
  {
    id: 2,
    providerId: 1,
    title: 'Женская стрижка',
    photo_url: [
      'https://tanita-romario.ua/wp-content/uploads/2021/10/%D0%B2%D1%81%D0%B5-%D0%B2%D0%B8%D0%B4%D1%8B-%D0%B8-100-%D1%84%D0%BE%D1%82%D0%BE.jpg',
    ],
    duration: 30,
    start_time: 480,
    end_time: 1020,
    category: 'beauty',
    days_of_week: ['everyday'],
    description: 'Лучшие стрижки в городе Кобрин',
    price: 25,
    status: 'active',
  },
];

export const Service = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);

  const { data: service } = useGetServiceQuery(
    { serviceId: +serviceId! },
    { skip: serviceId === undefined },
  );

  console.log(service);

  const handleUpdateService = () => {
    navigate(`../${serviceId}/update`);
  };

  console.log(serviceId);

  return (
    <List>
      <Title>Страница услуги</Title>
      <Section header={'Информация об услуге'}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            margin: '12px 0',
          }}
        >
          <Image
            src={'https://api.reservic.ru/' + service?.photo_url}
            size={96}
            style={{ userSelect: 'none', marginTop: '12px' }}
          />
        </div>
        <Cell subtitle="Название">{service?.title}</Cell>
        <Cell subtitle="Категория">{'Красота'}</Cell>
        <Cell subtitle="Цена">{service?.price + ' BYN'}</Cell>
        <Cell subtitle="Описание">{service?.description}</Cell>
        <Cell subtitle="Длительность">{service?.duration + ' мин'}</Cell>
        <Cell subtitle="Доступность">
          {`${formatMinutes(service?.start_time || 0)}-${formatMinutes(service?.end_time || 0)}`}
        </Cell>
      </Section>

      <Section
        header={'Отзывы'}
        style={{ marginBottom: `${safeAreaBottom + 120}px` }}
      >
        {service?.reviews.map(review => {
          return (
            <Cell
              before={<Avatar size={48} src={review.user.photo_url} />}
              subhead={review.user.first_name}
              subtitle={<Rating value={review.value} disabled />}
              description={review.text}
            />
          );
        })}
      </Section>
      <FixedLayout
        vertical="bottom"
        style={{ padding: '16px', paddingBottom: `${safeAreaBottom + 8}px` }}
      >
        <Button size="l" stretched onClick={handleUpdateService}>
          Изменить услугу
        </Button>
      </FixedLayout>
    </List>
  );
};
