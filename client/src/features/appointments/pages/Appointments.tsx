import {
  IconButton,
  Input,
  List,
  SegmentedControl,
  Tappable,
} from '@telegram-apps/telegram-ui';
import { useState } from 'react';
import { IoCloseOutline, IoFilterOutline } from 'react-icons/io5';

export const Appointments = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [bookingMode, setBookingMode] = useState<'upcoming' | 'history'>(
    'upcoming',
  );

  return (
    <List>
      <SegmentedControl>
        <SegmentedControl.Item
          selected={bookingMode === 'upcoming'}
          onClick={() => setBookingMode('upcoming')}
        >
          Будущие
        </SegmentedControl.Item>
        <SegmentedControl.Item
          selected={bookingMode === 'history'}
          onClick={() => setBookingMode('history')}
        >
          Прошлые
        </SegmentedControl.Item>
      </SegmentedControl>
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
    </List>
  );
};
