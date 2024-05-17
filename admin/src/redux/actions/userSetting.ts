import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSettingSlice } from "../reducers/userSetting";
import { getListUserSetting } from "../services/userSetting";

export const listUserSettingAction = createAsyncThunk<any,{q: any,page: any,pageSize: any}>(
    'userSetting/all',
    async ({q,page,pageSize}, { dispatch, rejectWithValue }) => {
      try {
        const response: any = await getListUserSetting(q,page,pageSize);
        dispatch(getUserSettingSlice(response.data));
      } catch (e: any) {
        return rejectWithValue(e.message);
      }
    },
);