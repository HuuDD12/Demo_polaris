import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, createCustomButton } from "../services/product";
import { listProductSlice } from "../reducers/product";
import { message } from "antd";

export const getAllProduct = createAsyncThunk<any,{page: any,pageSize: any}>(
    'product/all',
    async ({page,pageSize}, { dispatch, rejectWithValue }) => {
      try {
        const response: any = await getAll(page,pageSize);
        dispatch(listProductSlice(response.data));
      } catch (e: any) {
        return rejectWithValue(e.message);
      }
    },
);
export const createCustomButonActive = createAsyncThunk<any,any>(
  'product/custombutton',
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await createCustomButton(data);
      message.success("create successfully !!!");
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);