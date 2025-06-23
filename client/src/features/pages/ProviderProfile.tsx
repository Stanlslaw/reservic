import { List, Section, Title, Cell, Image, Tappable } from 'tmaui';
import { useGetProviderQuery } from '../../api/providersApi';
import { IoChevronForward } from 'react-icons/io5';
import { formatMinutes } from '../../utils/format';
import { useNavigate, useParams } from 'react-router';
import { useGetServicesQuery } from '../../api/servicesApi';

export const ProviderProfile = () => {
  const { providerId } = useParams();

  const { data: provider } = useGetProviderQuery(
    { providerId: +providerId! },
    { skip: providerId === undefined },
  );

  const { data: services } = useGetServicesQuery(
    { providerId: +providerId! },
    { skip: providerId === undefined },
  );

  const navigate = useNavigate();

  const goToService = (serviceId: number) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <List>
      <Title>Страница провайдера</Title>
      <Section header={'персональная информация провайдера'}>
        <Cell subtitle={'Имя'}>{provider?.name}</Cell>
        <Cell subtitle={'Описание'}>{provider?.description}</Cell>
        <Cell subtitle={'Номер телефона'}>{provider?.phone_number}</Cell>
        <Cell subtitle={'Адрес'}>{provider?.address}</Cell>
      </Section>
      <Section header={'Услуги провайдера'}>
        {services?.map(service => (
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
            subtitle={`${service.price} BYN ${formatMinutes(service.start_time)}-${formatMinutes(service.end_time)} ${service.duration} minutes`}
            description={service.description}
          >
            {service.title}
          </Cell>
        ))}
      </Section>
    </List>
  );
};
