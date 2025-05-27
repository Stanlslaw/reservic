import { cloudStorage } from '@telegram-apps/sdk-react';

export const useCloudStorage = <T>(key: string) => {
  const getItem = async (): Promise<T | undefined> => {
    const item = await cloudStorage.getItem(key);
    if (item === undefined) return;
    return JSON.parse(item) as T;
  };
  const setItem = async (item: T) => {
    await cloudStorage.setItem(key, JSON.stringify(item));
  };
  const deleteItem = async () => await cloudStorage.deleteItem(key);

  return { getItem, setItem, deleteItem };
};
