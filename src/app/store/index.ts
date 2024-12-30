'use client';
import { configureStore } from '@reduxjs/toolkit';
import userManagementReducer from './userManagementSlice';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    userManagement: userManagementReducer,
    form: formReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
