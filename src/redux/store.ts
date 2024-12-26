import { configureStore } from '@reduxjs/toolkit';
import componentReducer from "@/redux/app/component/componentSlice";  // Use default import

export const store = configureStore({
  reducer: {
    components: componentReducer,  // Use default export here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
