import _ from 'lodash';
import { Pagination } from './product';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface UserSetting {
    id: any,
    store_name: any,
    installed_date: any,
    status: any,
    plan_name: any,
}

export interface Pagi {
    totalItems: number,
    total: number,
    current: number,
    pageSize: number
}
export interface UserSettingState {
    pagi: {
        items: UserSetting[];
        pagination: Pagi | null;
    };
}
export const initialState: UserSettingState = {
    pagi: {
        items: [],
        pagination: null
    }
};

export const userSettingSlice =  createSlice({
    name: 'userSetting',
    initialState,
    reducers: {
        getUserSettingSlice: (state, action: PayloadAction<{items: UserSetting[],pagination: Pagi}>)=>{
            _.assign(state.pagi= action.payload);
        }
    }
})
export const { getUserSettingSlice, } = userSettingSlice.actions;
export default userSettingSlice.reducer;
