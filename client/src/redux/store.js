import { configureStore } from "@reduxjs/toolkit";
import reducer from "./UserSlice";

const store = configureStore({
  reducer: reducer,
});

export default store;
