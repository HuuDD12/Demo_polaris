import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';
import {IUser} from "@/types/auth";

export interface IAuthState {
    fetching: boolean;
    isLogged: boolean;
    user: IUser | null;
    error: string
}

const authState: IAuthState = {
    fetching: false,
    isLogged: false,
    user: null,
    error: ''

};
const commonSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        setAuthState(state: IAuthState, action: PayloadAction<any>) {
            _.assign(state, action.payload);
        },
    },
});
export const {setAuthState} = commonSlice.actions;
export default commonSlice.reducer;
