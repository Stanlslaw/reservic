import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { initData } from '@telegram-apps/sdk-react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.reservic.ru',
  mode: 'cors',
  prepareHeaders: headers => {
    const initDataRaw = initData.raw();

    if (initDataRaw) {
      headers.set('authorization', `tma ${initDataRaw}`);
    }

    return headers;
  },
});
