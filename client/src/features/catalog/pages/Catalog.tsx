import {
  List,
  Input,
  Tappable,
  IconButton,
  Title,
  Image,
  Caption,
  Section,
  Cell,
  Modal,
  Select,
  Slider,
} from 'tmaui';
import { useState } from 'react';
import {
  IoFilterOutline,
  IoCloseOutline,
  IoChevronForward,
} from 'react-icons/io5';
import { formatMinutes } from '../../../utils/format';

import { useNavigate } from 'react-router';
import { useGetServicesQuery } from '../../../api/servicesApi';
import { useSignal, viewport } from '@telegram-apps/sdk-react';
import { GetServicesQueryDto } from '../../../../../api/src/services/service.entity';

export const Catalog = () => {
  const navigate = useNavigate();
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);

  const [isFilterModalOpened, setIsFilterModalOpened] = useState(false);

  const [filters, setFilters] = useState<GetServicesQueryDto>({});
  const { data: services } = useGetServicesQuery(filters);

  const goToService = (serviceId: number) => {
    console.log(serviceId);
    navigate(`/service/${serviceId}`);
  };

  return (
    <List>
      <Title>Каталог услуг</Title>
      <div
        style={{
          width: '100%',
          display: 'flex',
          gap: 8,
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Input
            placeholder="Поиск"
            value={filters.name}
            onChange={e => setFilters({ ...filters, name: e.target.value })}
            after={
              <Tappable
                style={{ display: 'flex' }}
                Component={'div'}
                onClick={() => setFilters({ ...filters, name: '' })}
              >
                <IoCloseOutline />
              </Tappable>
            }
          />
        </div>
        <IconButton
          mode="outline"
          size="m"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setIsFilterModalOpened(true)}
        >
          <IoFilterOutline size={24} />
        </IconButton>
      </div>
      <div></div>
      <Section header={'Список услуг'}>
        {services ? (
          <>
            {services.map(service => {
              return (
                <Cell
                  style={{ padding: '12px' }}
                  before={
                    <Image
                      src={'https://api.reservic.ru/' + service.photo_url}
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
          </>
        ) : (
          <Title style={{ padding: '16px' }}>Нет доступных услуг</Title>
        )}
        <Modal
          open={isFilterModalOpened}
          onOpenChange={setIsFilterModalOpened}
          header={<Modal.Header>Фильтр услуг</Modal.Header>}
        >
          <List style={{ paddingBottom: `${safeAreaBottom}px` }}>
            <Select
              header={'Категория'}
              defaultValue={''}
              onChange={e =>
                setFilters({
                  ...filters,
                  category: e.target.value === '' ? undefined : e.target.value,
                })
              }
            >
              <option value="" disabled hidden>
                Выберите категорию
              </option>
              <option value="beauty">Красота</option>
              <option value="health">Здоровье</option>
              <option value="repair">Ремонт</option>
              <option value="cars">Автомобили</option>
            </Select>
            <Slider
              before={<Caption>{'0 BYN'}</Caption>}
              after={<Caption>{'5000 BYN'}</Caption>}
              value={[filters.minPrice || 0, filters.maxPrice || 5000]}
              min={0}
              max={5000}
              multiple
              onChange={value => {
                setFilters({
                  ...filters,
                  minPrice: value[0],
                  maxPrice: value[1],
                });
              }}
            />
          </List>
        </Modal>
      </Section>
    </List>
  );
};
