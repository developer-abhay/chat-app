import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  chatId: null,
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
  },
});

export const { login, logout, updateChatId } = userSlice.actions;

export default userSlice.reducer;
