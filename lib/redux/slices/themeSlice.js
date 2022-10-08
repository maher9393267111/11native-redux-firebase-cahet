import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getTheme = async () => {
  try {
    await AsyncStorage.getItem("darkMode");
  } catch (e) {
    console.log(e);
  }
};

export const initialState = {
  themeMode: getTheme || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
