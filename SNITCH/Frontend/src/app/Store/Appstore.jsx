import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "../Features/Auth/State/Authslice";

export const store = configureStore({
    reducer: {
        auth: Authreducer,
    },
});
