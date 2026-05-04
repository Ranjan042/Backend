import { createSlice } from "@reduxjs/toolkit";
import { SetLoading } from "../../products/State/Productslice";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: true,
    error: null,
  },
  reducers: {
    SetCart: (state, action) => {
      state.cart = action.payload;
    },

    SetincreaseProductQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

      try {
             const item = state.cart.cartItems.find(
        (item) =>
          item.product._id.toString() === productId.toString() &&
          item.varient.toString() === variantId.toString(),
      );
      if (item && item.quantity < item.product.variant.stock) {
        item.quantity += 1;
      }
      } catch (error) {
        console.log(error.message)
      }
    },

    SetDecreaseProductQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

      const item = state.cart.cartItems.find(
        (item) =>
          item.product._id.toString() === productId.toString() &&
          item.varient.toString() === variantId.toString(),
      );

        console.log("item",state.cart.cartItems)

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    SetLoadinginCart: (state, action) => {
      state.loading = action.payload;
    },

    SetErrorinCart: (state, action) => {
      state.error = action.payload;
    },

  },

});

export const {
  SetCart,
  SetincreaseProductQuantity,
  SetDecreaseProductQuantity,
  SetLoadinginCart,
  SetErrorinCart,
} = CartSlice.actions;

export default CartSlice.reducer;
