import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionDetails: [],
};
const chatSessionSlice = createSlice({
  name: "chatSession",
  initialState,
  reducers: {
    setSessionDetails: (state, action) => {
      state.sessionDetails = action.payload;
    },
    resetSessionDetails: (state) => {
      state.sessionDetails = [];
    },
  },
});

export const { setSessionDetails, resetSessionDetails } =
  chatSessionSlice.actions;

export const selectSessionDetails = (state: {
  chatSession: { sessionDetails: unknown };
}) => state.chatSession.sessionDetails;

export default chatSessionSlice.reducer;
