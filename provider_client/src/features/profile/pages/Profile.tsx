import {
  Avatar,
  List,
  Section,
  Title,
  Cell,
  Button,
} from '@telegram-apps/telegram-ui';
import { useGetUserQuery, useUpdateUserMutation } from '../../../api/usersApi';
import { initData, requestContact } from '@telegram-apps/sdk-react';

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

  const updateNumber = async () => {
    const data = await requestContact();
    if (data) {
      const contact = data.contact;
      await updateUser({
        first_name: contact.first_name,
        last_name: contact.last_name,
        phone_number: contact.phone_number,
      });
    }
  };

  return (
    <List>
      <Avatar
        style={{ justifySelf: 'center' }}
        size={96}
        src={user?.photo_url}
      />

      <Title style={{ textAlign: 'center' }}>{showname}</Title>
      <Section header={'персональная информация'}>
        <Cell
          subtitle={'Номер телефона'}
          after={
            !user?.phone_number ? (
              <Button onClick={updateNumber} size="s">
                Добавить
              </Button>
            ) : undefined
          }
        >
          {user?.phone_number || 'Не Указан'}
        </Cell>
        <Cell subtitle={'username'}>{user?.username || 'Не создан'}</Cell>
        <Cell subtitle={'Премиум пользователь'}>
          {user?.is_premium ? 'Премиум' : 'Нет Премиума'}
        </Cell>
      </Section>
    </List>
  );
};
