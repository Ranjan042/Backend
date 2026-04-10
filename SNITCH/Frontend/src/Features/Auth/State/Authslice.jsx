import { createSlice } from "@reduxjs/toolkit";
import { load } from "npm";

const Authslice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,    
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        },
        SetLoading: (state, action) => {
            state.loading = action.payload;
        },
        SetError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { SetUser, SetLoading, SetError } = Authslice.actions;
export default Authslice.reducer;