import { List, Section, Title, Cell, FixedLayout, Button } from 'tmaui';

import { useGetProviderQuery } from '../../../api/providersApi';
import { useSignal, viewport } from '@telegram-apps/sdk-react';

export const ProviderProfile = () => {
  const { data: provider } = useGetProviderQuery();
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);

  return (
    <List>
      <Title>Страница провайдера</Title>
      <Section header={'персональная информация провайдера'}>
        <Cell subtitle={'Имя'}>{provider?.name}</Cell>
        <Cell subtitle={'Имя телеграмм'}>{provider?.username}</Cell>
        <Cell subtitle={'Описание'}>{provider?.description}</Cell>
        <Cell subtitle={'Номер телефона'}>{provider?.phone_number}</Cell>
        <Cell subtitle={'Адрес'}>{provider?.address}</Cell>
      </Section>
      <FixedLayout
        vertical="bottom"
        style={{ padding: '16px', paddingBottom: `${safeAreaBottom + 8}px` }}
      >
        <Button
          size="l"
          loading={false}
          disabled={false}
          stretched
          onClick={() => {}}
        >
          Редактировать профиль
        </Button>
      </FixedLayout>
    </List>
  );
};
