import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
