import mongoose from "mongoose";
import PriceSchema from "./PriceSchema.js";

const PaymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
        required: true,
    },
    price:{
        type: PriceSchema,
        required:true,
    },
    razorpay:{
        orderId: String,
        paymentId: String,
        signature: String,
    },
    orderedItems:[
        {
            title:String,
            productId:mongoose.Schema.Types.ObjectId,
            variantId:mongoose.Schema.Types.ObjectId,
            quantity:Number,
            images:[
                {
                    url:String
                }
            ],
            description:String,
            price:PriceSchema,
        }
    ]
})

const PaymentModel=mongoose.model("Payment",PaymentSchema);

export default PaymentModel;