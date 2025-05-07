import { configureStore } from "@reduxjs/toolkit";
import FlowSlice, { saveStateMiddleware } from "../FlowSlice.storage";

export const store = configureStore({
  reducer: {
    FlowReducer: FlowSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveStateMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
