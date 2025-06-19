import chatReducer from "@/slices/chat/chatSlice";
import { configureStore } from "@reduxjs/toolkit";
import allChatsReducer from "@/slices/allChats/allChatsSlice";
import authSlice from "@/slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authSlice.reducer,
  },
});
