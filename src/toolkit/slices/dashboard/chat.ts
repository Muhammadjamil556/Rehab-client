import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  id: string;
  message: string;
  timestamp: number;
  // Add other properties as needed
}

interface ChatState {
  chats: Chat[];
  displayChat: boolean;
}

const initialState: ChatState = {
  chats: [],
  displayChat: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setDisplayChat: (state, action: PayloadAction<boolean>) => {
      state.displayChat = action.payload;
    },
    resetChat: (state) => {
      state.chats = [];
      state.displayChat = false;
    },
  },
});

// Export actions
export const { setChats, setDisplayChat, resetChat } = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;

// Selector to get chat details from state
export const selectChatDetails = (state: { chat: ChatState }) =>
  state.chat.chats;

export const selectDisplayChat = (state: { chat: ChatState }) =>
  state.chat.displayChat;
