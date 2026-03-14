import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import uiReducer from './slices/ui-slice';

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production'
  });
}
