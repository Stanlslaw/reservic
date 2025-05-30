import { List, Title } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router';

export const More = () => {
  const navigate = useNavigate();
  return (
    <List>
      <Title onClick={() => navigate({ pathname: '/more/profile' })}>
        profile
      </Title>
    </List>
  );
};
