import mogoose from "mongoose";
import PriceSchema from "./PriceSchema.js";
const CartSchema = new mogoose.Schema({
    user: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartItems: [
        {   
            product: {
                type: mogoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            varient: {
                type: mogoose.Schema.Types.ObjectId,
                ref: "Product.variant",
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
            price:{
                type: PriceSchema,
                required: true,
            }
        },
    ],
});

const CartModel = mogoose.model("Cart", CartSchema);
export default CartModel;      