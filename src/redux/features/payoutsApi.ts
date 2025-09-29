import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

export const payoutsApi = createApi({
  reducerPath: 'payoutsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ['Payouts'],
  endpoints: (builder) => ({
    getPayoutTransactions: builder.query<PayoutWithPayment[], void>({
      query: () => 'paypal-payout/transactions',
      providesTags: ['Payouts'],
    }),
    getAllPayoutTransactions: builder.query<PayoutWithPayment[], void>({
      query: () => 'paypal-payout/all-transactions',
      providesTags: ['Payouts'],
    }),
  }),
});

export const { useGetPayoutTransactionsQuery, useGetAllPayoutTransactionsQuery } = payoutsApi; 