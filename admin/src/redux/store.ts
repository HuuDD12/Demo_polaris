import common from '@/redux/reducers/common';
import auth from '@/redux/reducers/auth';
import user from '@/redux/reducers/user';
import Product from '@/redux/reducers/product';
import UserSetting from '@/redux/reducers/userSetting';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    common, auth, user, Product,UserSetting
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
