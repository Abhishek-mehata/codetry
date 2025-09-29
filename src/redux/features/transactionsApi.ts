import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TransactionApiItem {
  id?: string;
  refId?: string | null;
  context?: string;
  amount?: number | null;
  fee?: number | null;
  fixRate?: number | null;
  feeAmount?: number | null;
  totalAmount?: number | null;
  payerId?: string | null;
  payerName?: string | null;
  payerEmail?: string | null;
  payerCountryCode?: string | null;
  paidAt?: string | null;
  isPaid?: boolean;
  haveNextPayment?: boolean;
  nextPaymentAmount?: number | null;
  isNextPaymentPaid?: boolean | null;
  userId?: number;
  platformCharge?: number | null;
  adminCommission?: number | null;
  createdAt?: string;
  updatedAt?: string;
  paymentMethod?: string | null;
  User?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string | null;
    country?: string | null;
    role?: string;
    isSeller?: boolean;
    isEmailConfirmed?: boolean;
    emailVerifyToken?: string | null;
    passwordResetToken?: string | null;
    isPhoneNumberConfirmed?: boolean;
    isCountryConfirmed?: boolean;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    profilePicture?: string | null;
  };
}

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

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionApiItem[], void>({
      query: () => 'payment/transaction',
    }),
    getRoomDetails: builder.query<unknown, string>({
      query: (id) => `payment/transaction/room-details/${id}`,
    }),
    getPlaceDetails: builder.query<unknown, string>({
      query: (id) => `payment/transaction/place-details/${id}`,
    }),
    getEventDetails: builder.query<unknown, string>({
      query: (id) => `payment/transaction/event-details/${id}`,
    }),
    getBoostDetails: builder.query<unknown, string>({
      query: (id) => `payment/transaction/boost-details/${id}`,
    }),
    // Seller transactions endpoint
    getSellerTransactions: builder.query<unknown, number>({
      query: (userId) => `payment/user/payments/${userId}`,
    }),
  }),
});

export const { useGetTransactionsQuery, useGetRoomDetailsQuery, useGetPlaceDetailsQuery, useGetEventDetailsQuery, useGetBoostDetailsQuery, useGetSellerTransactionsQuery } = transactionsApi;
