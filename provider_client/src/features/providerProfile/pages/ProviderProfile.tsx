import { List } from '@telegram-apps/telegram-ui';
import { useGetProviderQuery } from '../../../api/providersApi';

export const ProviderProfile = () => {
  const { data } = useGetProviderQuery();
  console.log(data);
  return <List>Provider Profile</List>;
};
