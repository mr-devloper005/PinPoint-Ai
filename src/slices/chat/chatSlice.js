import { getChatTitle } from "@/services/chat-services/getChatTitle";
import { getMessages } from "@/services/chat-services/getMessages";
import { getUserChats } from "@/services/chat-services/getUserChats";
import { sendMessage } from "@/services/chat-services/sendMessage";
import { updateChatLanguage } from "@/services/chat-services/updateChatLanguage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userChats: [],
  messages: [],
  loading: false,
  getChatLoading: false,
  chatId: "",
  chatLanguage: "english",
};

export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, content }) => {
    const res = await sendMessage(chatId, content);
    return { role: "ai", content: res.data.aiMessage.content };
  }
);

export const getMessagesThunk = createAsyncThunk(
  "chat/getMessage",
  async (chatId) => {
    const data = await getMessages(chatId);
    return data;
  }
);

export const getChatTitleThunk = createAsyncThunk(
  "chat/chatTitle",
  async ({ content, chatId }) => {
    const data = await getChatTitle(content, chatId);

    return { chatId, newTitle: data.title };
  }
);

export const getUserChatsThunk = createAsyncThunk(
  "chat/getUserChats",
  async () => {
    const data = getUserChats();

    return data;
  }
);

export const updateLanguageThunk = createAsyncThunk(
  "chat/updateLanguage",
  async ({ chatId, language, toast }) => {
    const res = await updateChatLanguage(chatId, language);

    return res;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setChatLanguage: (state, action) => {
      state.chatLanguage = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessageThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessagesThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getChatTitleThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatTitleThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { chatId, newTitle } = action.payload;

        const chat = state.userChats.find((chat) => chat._id === chatId);

        if (chat) {
          chat.title = newTitle;
        }
      })
      .addCase(getChatTitleThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserChatsThunk.pending, (state) => {
        state.getChatLoading = true;
      })
      .addCase(getUserChatsThunk.fulfilled, (state, action) => {
        state.getChatLoading = false;
        state.userChats = action.payload;
      })
      .addCase(getUserChatsThunk.rejected, (state) => {
        state.getChatLoading = false;
      })
      .addCase(updateLanguageThunk.fulfilled, (state, action) => {
        state.chatLanguage = action.payload;
        console.log(action.payload);
        console.log(state.chatLanguage);
      });
  },
});

export const { addMessage, clearMessages, setChatId } = chatSlice.actions;
export default chatSlice.reducer;
