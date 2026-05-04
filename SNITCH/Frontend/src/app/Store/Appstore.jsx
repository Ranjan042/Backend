import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "../../Features/Auth/State/Authslice.jsx";
import Productsreducer from "../../Features/products/State/Productslice.jsx";
import Cartreducer from "../../Features/Cart/Store/CartSlice.jsx";

export const store = configureStore({
    reducer: {
        auth: Authreducer,
        product: Productsreducer,
        cart: Cartreducer,
    },
});
