import {
  openTelegramLink,
  shareURL,
  useSignal,
  viewport,
} from '@telegram-apps/sdk-react';
import { Avatar, Cell, List, Section, Switch, Title } from 'tmaui';
import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { useGetUserQuery } from '../../../api/usersApi';

const MORE_ACTIONS: { text: string; action: () => void }[] = [
  {
    text: 'Написать в поддержку',
    action: () => openTelegramLink('https://t.me/stanlslavv'),
  },
  {
    text: 'Поделиться с друзьями',
    action: () =>
      shareURL(
        'https://t.me/reservic_bot',
        'Reservic поможет тебе найти хорошую услугу',
      ),
  },
  {
    text: 'Стать провайдером',
    action: () => openTelegramLink('https://t.me/reservic_provider_bot'),
  },
];

export const More = () => {
  const isFullscreen = useSignal(viewport.isFullscreen);
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery();

  const handleFullSize = async () => {
    console.log(isFullscreen);
    if (isFullscreen) {
      viewport.exitFullscreen();
      return;
    }
    await viewport.requestFullscreen();
    viewport.expand();
  };

  const goToProfile = () => {
    navigate({ pathname: '/more/profile' });
  };

  console.log('data', user);

  return (
    <List>
      <Title>Дополнительные возможности</Title>
      <Section header="Профиль">
        <Cell
          subtitle={user?.username}
          before={<Avatar size={48} src={user?.photo_url} />}
          after={<IoChevronForward size={24} />}
          onClick={goToProfile}
        >
          {user?.first_name + ' ' + user?.last_name}
        </Cell>
      </Section>
      <Section header="Настройки">
        <Cell
          after={<Switch checked={isFullscreen} onChange={handleFullSize} />}
        >
          Полный экран
        </Cell>
      </Section>
      <Section header={'Дополнительно'}>
        {MORE_ACTIONS.map(({ text, action }, index) => (
          <Cell
            key={`more-item-${index}`}
            onClick={action}
            after={<IoChevronForward />}
          >
            {text}
          </Cell>
        ))}
      </Section>
    </List>
  );
};
