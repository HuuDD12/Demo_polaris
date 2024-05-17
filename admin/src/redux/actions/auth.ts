import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthCredentials } from '@/types/auth';
import { changePass, reqAuthLogin, reqAuthLogingg, reqAuthLogout, reqVerifyToken } from '@/redux/services/auth';
import { setAuthState } from '@/redux/reducers/auth';
import { setCommonState } from '@/redux/reducers/common';

export const onLogin = createAsyncThunk<any, IAuthCredentials>(
  'auth/login',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthState({ fetching: true }));
      const response: any = await reqAuthLogin(payload);
      const data = response.data;
      sessionStorage.setItem('token', data.accessToken);
      sessionStorage.setItem('isLogged','true');
      dispatch(setAuthState({ isLogged: true, user: data.user }));
      return data;
    } catch (e: any) {
      dispatch(setAuthState({ error: e.message }));
      return rejectWithValue(e.message);
    } finally {
      dispatch(setAuthState({ fetching: false }));
    }
  },
);
export const onLoginGg = createAsyncThunk<any, any>(
  'auth/login',
  async (dto:any,{ dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthState({ fetching: true }));
      const response: any = await reqAuthLogingg(dto.profileObj,dto.accessToken);
      const data = response.data;
      sessionStorage.setItem('token', data.accessToken);
      sessionStorage.setItem('isLogged','true');
      dispatch(setAuthState({ isLogged: true, user: data.user }));
      return data;
    } catch (e: any) {
      dispatch(setAuthState({ error: e.message }));
      return rejectWithValue(e.message);
    } finally {
      dispatch(setAuthState({ fetching: false }));
    }
  },
);

export const onLogout = createAsyncThunk<any>(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setCommonState({ acLoad: true }));
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('isLogged');
      dispatch(setAuthState({ isLogged: false, user: null }));
      await reqAuthLogout();
      return true;
    } catch (e: any) {
      return rejectWithValue(e.message);
    } finally {
      dispatch(setCommonState({ acLoad: false }));
    }
  },
);

export const onVerifyToken = createAsyncThunk<any>(
  'auth/verifyToken',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setCommonState({ loading: true }));
      const token = sessionStorage.getItem('token');
      if (!token) {
       await dispatch(onLogout());
      }
      const result = await reqVerifyToken();
      dispatch(setAuthState({ isLogged: true, user: result.data }));
    } catch (e: any) {
      return rejectWithValue(e.message);
    } finally {
      dispatch(setCommonState({ loading: false }));
    }
  },
);

export const changePassActions = createAsyncThunk<any,any>(
  'auth/changePass',
  async(data:any,{dispatch,rejectWithValue})=>{
    try {
      const result = await changePass(data);
      return result.data;
    } catch (e: any) {
      return rejectWithValue(e.message)
    }

  }
);
