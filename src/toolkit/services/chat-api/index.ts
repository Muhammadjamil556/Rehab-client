import { createApi } from "@reduxjs/toolkit/query/react";
import BaseUrl from "../../../utils/baseurl";

interface SessionDetails {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

type SessionId = string;

// Define the payload type for sending messages
interface SendMessagePayload {
  chatSessionId: string;
  userQuestion: string;
  aiAnswer: string;
  userId: string;
}

export const SideBarApi = createApi({
  reducerPath: "SideBarApi",
  tagTypes: ["SideBarApi"],
  baseQuery: BaseUrl,
  endpoints: (builder) => ({
    getSessionDetails: builder.query<SessionDetails, SessionId>({
      query: (sessionId: SessionId) =>
        `/api/v1/get-session-details/${sessionId}`,
      providesTags: ["SideBarApi"],
    }),
    startChat: builder.mutation<unknown, unknown>({
      query: (payload: unknown) => ({
        url: `/api/v1/start-chat`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SideBarApi"],
    }),
    sendMessage: builder.mutation<unknown, SendMessagePayload>({
      query: (payload: SendMessagePayload) => ({
        url: `/api/v1/send-message`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SideBarApi"],
    }),
    getChatsBySessionId: builder.query<unknown, unknown>({
      query: (chatSessionId: unknown) => `/api/v1/chats/${chatSessionId}`,
      providesTags: ["SideBarApi"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetSessionDetailsQuery,
  useStartChatMutation,
  useSendMessageMutation,
  useGetChatsBySessionIdQuery,
} = SideBarApi;

export default SideBarApi;
