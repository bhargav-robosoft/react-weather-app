import { configureStore } from "@reduxjs/toolkit";

import weatherReducer from "./weather";
import uiReducer from "./ui";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    ui: uiReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
