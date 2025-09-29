import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use the same baseUrl and prepareHeaders as transactionsApi
const baseUrl = import.meta.env.VITE_BACKEND_BASE_API;

const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem('token') || localStorage.getItem('admin-token');
  if (token && !['undefined', 'null'].includes(token)) {
    headers.set('authorization', `Bearer ${token}`);
  }
  const userId = localStorage.getItem('user_id');
  if (userId) {
    headers.set('User_id', userId);
  }
  return headers;
};

export const getPaymentPrices = createApi({
  reducerPath: 'getPaymentPrices',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getPaymentPrices: builder.query<unknown, void>({
      query: () => 'explore/settings',
    }),
    getPaymentSettings: builder.query<unknown, void>({
      query: () => 'payment/settings',
    }),
  }),
});

export const { useGetPaymentPricesQuery, useGetPaymentSettingsQuery } = getPaymentPrices;
