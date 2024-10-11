import { configureStore } from "@reduxjs/toolkit";
import chatSessionSlice from "./slices/dashboard/session";
import chatSlice from "./slices/dashboard/chat";

import SideBarApi from "./services/chat-api";

// Configure the store
export const store = configureStore({
  reducer: {
    chatSession: chatSessionSlice,
    chat: chatSlice,
    // Add the API reducer
    [SideBarApi.reducerPath]: SideBarApi.reducer,
  },
  // Add the API middleware for caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SideBarApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {chatSession: ChatSessionState, sidebarApi: SideBarApiState}
export type AppDispatch = typeof store.dispatch;
