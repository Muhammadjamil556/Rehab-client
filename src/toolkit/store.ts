import { configureStore } from "@reduxjs/toolkit";

import medicineApi from "./services/medicine-api/index";

export const store = configureStore({
  reducer: {
    [medicineApi.reducerPath]: medicineApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(medicineApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
