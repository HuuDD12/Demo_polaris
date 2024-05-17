import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export interface Product {
    id: any,
    title: any,
    body_html: any,
    vendor: any,
    image: any,
}
export interface Pagination{
    total: any,
    pageSize: any,
    current: any,
}

export interface ProductState {
    product: {
        pagi: Pagination|null;
        products: Product[]
    };

}
export const initialState: ProductState = {
    product: {
        pagi: null,
        products: []
    },
};
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        listProductSlice: (state, action: PayloadAction<{pagi: Pagination,products: Product[]}>) => {
            _.assign(state.product = action.payload);
        },
    }
})
export const { listProductSlice, } = productSlice.actions;
export default productSlice.reducer;