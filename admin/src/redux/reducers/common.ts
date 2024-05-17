import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

export interface ICommonState {
  loading: boolean;
  acLoad: boolean;
}

const commonState: ICommonState = {
  loading: false,
  acLoad: false,
};
const commonSlice = createSlice({
  name: 'common',
  initialState: commonState,
  reducers: {
    setCommonState(state: ICommonState, action: PayloadAction<any>) {
      _.assign(state, action.payload);
    },
  },
});
export const { setCommonState } = commonSlice.actions;
export default commonSlice.reducer;
