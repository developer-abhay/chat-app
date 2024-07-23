import { configureStore } from "@reduxjs/toolkit";
import reducer from "./UserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, PERSIST } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
