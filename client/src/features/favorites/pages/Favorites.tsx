import { Cell, Image, List, Section, Tappable, Title } from 'tmaui';
import { IoChevronForward } from 'react-icons/io5';
import { formatMinutes } from '../../../utils/format';
import { useNavigate } from 'react-router';
import { useGetUserFavoritesQuery } from '../../../api/favoritesApi';
import { initData, useSignal } from '@telegram-apps/sdk-react';

export const Favorites = () => {
  const navigate = useNavigate();
  const user = useSignal(initData.user);

  const { data: favorites } = useGetUserFavoritesQuery(
    { userId: user!.id },
    { skip: !user?.id },
  );

  const goToService = (serviceId: number) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <List>
      <Title>Любимые услуги</Title>

      <Section header={'Список любимых услуг'}>
        {favorites
          ?.map(favorites => favorites.service)
          .map(service => {
            return (
              <Cell
                style={{ padding: '12px' }}
                before={
                  <Image
                    src={'https://api.reservic.ru/' + service?.photo_url}
                    size={96}
                  />
                }
                after={
                  <Tappable onClick={() => goToService(service.id)}>
                    <IoChevronForward size={32} />
                  </Tappable>
                }
                subtitle={`${service.price} BYN ${formatMinutes(service.start_time)}-${formatMinutes(service.end_time)} ${service.duration} мин`}
                description={service.description}
              >
                {service.title}
              </Cell>
            );
          })}
      </Section>
    </List>
  );
};
