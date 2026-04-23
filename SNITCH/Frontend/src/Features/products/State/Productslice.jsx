import { createSlice } from "@reduxjs/toolkit";

const Productslice = createSlice({
  name: "product",
  initialState: {
    products: [],
    allProducts: [],
    selectedProduct: null,
    cart: [],
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
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    SetincreaseProductQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

        const item = state.cart.cartItems.find(
        (item) =>
          item.product._id.toString() === productId.toString() &&
          item.varient.toString() === variantId.toString(),
      );


      if (item) {
        item.quantity += 1;
      }

    },

    SetDecreaseProductQuantity: (state, action) => {
     const { productId, variantId } = action.payload;
     console.log("Decreasing")

        const item = state.cart.cartItems.find(
        (item) =>
          item.product._id.toString() === productId.toString() &&
          item.varient.toString() === variantId.toString(),
      );

      console.log("item",item)

      if (item) {
        item.quantity -= 1;
        console.log("UPDATED:", item.quantity);
      } else {
        console.log("NOT FOUND");
      }
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
  setCart,
  SetSelectedProduct,
  SetLoading,
  SetError,
  SetincreaseProductQuantity,
  SetDecreaseProductQuantity
} = Productslice.actions;
export default Productslice.reducer;
