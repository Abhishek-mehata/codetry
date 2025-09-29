import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserModel } from '../../types/user';

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

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Get user by ID - this is the endpoint you requested
    getUserById: builder.query<{ data: UserModel; message: string; statusCode: number; success: boolean }, string | number>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    
  }),
});

export const {
  useGetUserByIdQuery
} = usersApi;
