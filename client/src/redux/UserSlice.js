import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  allUsers: null,
  chatId: null,
  requests: null,
  chats: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateChatId: (state, action) => {
      state.chatId = action.payload;
    },
    getUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    getRequests: (state, action) => {
      state.requests = action.payload;
    },
    getChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { login, logout, updateChatId, getUsers, getRequests, getChats } =
  userSlice.actions;

export default userSlice.reducer;
