import { Tabbar } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { IoHomeOutline } from 'react-icons/io5';
import { IoIosHeartEmpty } from 'react-icons/io';
import { MdOutlineBookmarks } from 'react-icons/md';
import { IoIosMenu } from 'react-icons/io';
import { IconType } from 'react-icons';
import { useSignal, viewport } from '@telegram-apps/sdk-react';

interface TAB_BAR_ITEM {
  id: string;
  path: string;
  text: string;
  Icon: IconType;
}

const TAB_BARS_ITEMS: TAB_BAR_ITEM[] = [
  {
    id: 'services',
    path: '/services',
    text: 'Услуги',
    Icon: IoHomeOutline,
  },
  {
    id: 'appointments',
    path: '/appointments',
    text: 'Заказы',
    Icon: MdOutlineBookmarks,
  },
  {
    id: 'history',
    path: '/history',
    text: 'История',
    Icon: IoIosHeartEmpty,
  },
  {
    id: 'more',
    path: '/more',
    text: 'Дополнительно',
    Icon: IoIosMenu,
  },
] as const;

export const TabBarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const safeInsets = useSignal(viewport.safeAreaInsets);

  const [currentTabId, setCurrentTabId] = useState<string | undefined>();

  useEffect(() => {
    if (location) {
      setCurrentTabId(
        TAB_BARS_ITEMS.find(({ path }) => path === location.pathname)?.id,
      );
    }
  }, [location]);

  const onTabClick = (id: string, path: string) => {
    setCurrentTabId(id);
    navigate(path);
  };

  return (
    <>
      <div>
        <Outlet />
      </div>
      {currentTabId && (
        <Tabbar style={{ paddingBottom: `${safeInsets.bottom}px` }}>
          {TAB_BARS_ITEMS.map(({ id, text, path, Icon }) => (
            <Tabbar.Item
              key={id}
              text={text}
              selected={currentTabId === id}
              onClick={() => onTabClick(id, path)}
            >
              <Icon size={24} />
            </Tabbar.Item>
          ))}
        </Tabbar>
      )}
    </>
  );
};
