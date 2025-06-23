import { Avatar, List, Section, Title, Cell, Button } from 'tmaui';
import { useGetUserQuery, useUpdateUserMutation } from '../../../api/usersApi';
import { initData } from '@telegram-apps/sdk-react';

export const Profile = () => {
  const { data: user } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();

  console.log(initData.chat());
  console.log(user);

  const showname = user?.first_name
    ? user?.last_name
      ? user?.first_name + ' ' + user?.last_name
      : user?.first_name
    : 'Неизвестный';

  return (
    <List>
      <Title>Профиль клиента</Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar size={96} src={user?.photo_url} />
      </div>

      <Title style={{ textAlign: 'center' }}>{showname}</Title>
      <Section header={'персональная информация'}>
        <Cell
          subtitle={'Номер телефона'}
          after={
            !user?.phone_number ? <Button size="s">Добавить</Button> : undefined
          }
        >
          {user?.phone_number || 'Не Указан'}
        </Cell>
        <Cell subtitle={'username'}>{user?.username || 'Не создан'}</Cell>
      </Section>
    </List>
  );
};
