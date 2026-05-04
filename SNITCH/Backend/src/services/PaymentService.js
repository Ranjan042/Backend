import Razorpay from "razorpay";
import CONFIG from "../config/config.js";
import e from "express";

const Razorpayinstance = new Razorpay({
    key_id: CONFIG.RPAY_KEY_ID,
    key_secret: CONFIG.RPAY_KEY_SECRET,
});

export const createOrder = async ({amount,currency="INR"}) => {
    try {
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency
        };
        const order = await Razorpayinstance.orders.create(options);
        return order;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating order");
    }
};
