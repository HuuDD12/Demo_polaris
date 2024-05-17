import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash';
export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
}
export interface Pagi {
  totalItems: number,
  total: number,
  current: number,
  pageSize: number
}
export interface UserState {
  user: User[];
  view: User | null;
  pagi: {
    items: User[];
    pagination: Pagi|null;
  };
}
export const initialState: UserState = {
  user: [],
  view: null,
  pagi: {
    items:[],
    pagination:null
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    listUserSlice: (state, action: PayloadAction<User[]>) => {
      _.assign(state.user = action.payload);
    },
    searchUserSlice: (state, action: PayloadAction<{ items: User[], pagination: Pagi }>)=>{
      _.assign(state.pagi = action.payload);
    },
    viewUserSlice: (state, action: PayloadAction<User>) => {
      _.assign(state.view = action.payload);
    },
    createUserSlice: (state, action: PayloadAction<User>) => {
      _.assign(state.user.push(action.payload));
    },
    deleteUserSlice: (state, action: PayloadAction<number>) => {
      _.assign(state.user = state.user.filter(user => user.id !== action.payload));
    },
    listUserPagiSlice:(state, action: PayloadAction<{ items: User[], pagination: Pagi }>)=>{
      _.assign(state.pagi = action.payload);

    }
    // updateUserSlice: (state, action: PayloadAction<User>) => {
    //   _.assign(state.view = action.payload);
    // }
  }
})
export const { listUserSlice, viewUserSlice, deleteUserSlice,createUserSlice,searchUserSlice ,listUserPagiSlice} = userSlice.actions;
export default userSlice.reducer;