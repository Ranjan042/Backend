import { createSlice } from "@reduxjs/toolkit";

const Productslice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        SetProduct: (state, action) => {
            state.products = action.payload;
        },
        SetLoading: (state, action) => {
            state.loading = action.payload;
        },
        SetError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { SetProduct, SetLoading, SetError } = Productslice.actions;
export default Productslice.reducer;