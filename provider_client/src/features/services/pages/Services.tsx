import { List, Title } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router';

export const Services = () => {
  const navigate = useNavigate();

  return (
    <List>
      Services
      <Title onClick={() => navigate('./create')}>Create service</Title>
    </List>
  );
};
