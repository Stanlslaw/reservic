import { useState } from 'react';

export const useLocalStorage = <T>(key: string) => {
  const initialState = (() => {
    const itemString = localStorage.getItem(key);
    if (!itemString) return;
    return JSON.parse(itemString) as T;
  })();

  const [itemState, setItemState] = useState<T | undefined>(initialState);

  const setItem = (item: T) => {
    localStorage.setItem(key, JSON.stringify(item));
    setItemState(item);
  };

  return [itemState, setItem] as const;
};
