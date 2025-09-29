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

// Types for createChatRoom
export interface CreateChatRoomRequest {
  sellerId: number;
  bookingId: string;
}

export interface CreateChatRoomResponse {
  data: unknown; // Replace 'unknown' with the actual response structure if known
  message: string;
  statusCode: number;
  success: boolean;
}

export interface SendMessageRequest {
  roomId: string;
  content: string;
}

export interface SendMessageResponse {
  data: unknown; // Replace with actual response type if known
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: number;
  content: string;
  createdAt: string;
  sender: {
    role: string;
  };
}

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createChatRoom: builder.mutation<CreateChatRoomResponse, CreateChatRoomRequest>({
      query: (body) => ({
        url: 'chat/start',
        method: 'POST',
        body,
      }),
    }),
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: ({ roomId, content }) => ({
        url: `chat/sendsms/${roomId}`,
        method: 'POST',
        body: { content },
      }),
    }),
    getMessages: builder.query<ChatMessage[], string>({
      query: (roomId) => `chat/messages/${roomId}`,
    }),
  }),
});

export const {
  useCreateChatRoomMutation,
  useSendMessageMutation,
  useGetMessagesQuery
} = messageApi;
