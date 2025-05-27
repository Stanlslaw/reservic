import {
  Avatar,
  Badge,
  Caption,
  Card,
  Cell,
  Divider,
  IconButton,
  Image,
  Info,
  Input,
  List,
  Tappable,
} from '@telegram-apps/telegram-ui';
import { useState } from 'react';
import {
  IoCloseOutline,
  IoFilterOutline,
  IoHeart,
  IoHeartOutline,
} from 'react-icons/io5';

export const Favorites = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <List>
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
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            after={
              <Tappable
                style={{ display: 'flex' }}
                Component={'div'}
                onClick={() => setSearchText('')}
              >
                <IoCloseOutline />
              </Tappable>
            }
          />
        </div>
        <IconButton mode="outline" size="m">
          <IoFilterOutline size={24} />
        </IconButton>
      </div>
      <div></div>
      <List>
        <Card type="plain" style={{ width: '100%' }}>
          <Cell
            before={<Image size={48} />}
            subhead={'Название услуги'}
            subtitle={'описание'}
            description={'Описание услуги'}
            multiline
            after={
              <IconButton mode="outline" size="s">
                <IoHeart size={16} />
              </IconButton>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Caption>Цена:</Caption>
              <Info type="text" subtitle="BYN">
                500
              </Info>
            </div>
          </Cell>
          <Divider />

          <Card.Cell
            before={<Avatar size={28} />}
            after={
              <Badge type="number" mode="gray">
                5.0
              </Badge>
            }
          >
            Провайдер услуги
          </Card.Cell>
        </Card>
      </List>
    </List>
  );
};
