import { createSlice } from "@reduxjs/toolkit";

const Productslice = createSlice({
  name: "product",
  initialState: {
    products: [],
    allProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    SetProduct: (state, action) => {
      state.products = action.payload;
    },
    SetAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    SetSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
   
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  SetProduct,
  SetAllProducts,
  SetSelectedProduct,
  SetLoading,
  SetError,
} = Productslice.actions;
export default Productslice.reducer;
