import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "../../Features/Auth/State/Authslice.jsx";
import Productsreducer from "../../Features/products/State/Productslice.jsx";

export const store = configureStore({
    reducer: {
        auth: Authreducer,
        product: Productsreducer,
    },
});
