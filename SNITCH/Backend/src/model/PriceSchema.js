import mongoose  from "mongoose";

const PriceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "JPY", "INR"],
        required: true,
        default: "INR"
    }
},{
    _id: false,
    _v: false
});


export default PriceSchema;