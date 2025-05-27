import {
  List,
  Input,
  Tappable,
  IconButton,
  Info,
  Title,
  Caption,
  Subheadline,
  Headline,
} from '@telegram-apps/telegram-ui';
import { useState } from 'react';
import { IoFilterOutline, IoCloseOutline } from 'react-icons/io5';

export const Catalog = () => {
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
      <Headline>Каталог</Headline>
      <Subheadline>Найдено товаров: 1</Subheadline>
    </List>
  );
};
