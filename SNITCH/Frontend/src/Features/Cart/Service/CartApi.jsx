import axios from "axios";

const CartApi=axios.create({
    baseURL:"/api/cart",
    withCredentials:true,
})

export async function AddToCart(productId,variantId) {
    try {
        const response = await CartApi.post("/addtocart",{productId,variantId});   
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function GetCart() {
    try {
        const response = await CartApi.get("/");
        console.log("cart", response.data);
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function IncreaseProductQuantity(productId,variantId) {
    try {
        const response = await CartApi.post("/increment",{productId,variantId});
        
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function DecreaseProductQuantity(productId,variantId) {
    try {
        const response = await CartApi.post("/decrement",{productId,variantId});     
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function RemoveFromCart(productId,variantId) {
    try {
        const response = await CartApi.delete(`/removefromcart/${productId}/${variantId}`);   
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function CreateCartOrder() {
    try {
        const response = await CartApi.post("/payment/create-order");   
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}   

export async function VerifyCartOrder({razorpay_order_id, razorpay_payment_id, razorpay_signature}) {
    try {
        const response = await CartApi.post("/payment/verify-order",{razorpay_order_id, razorpay_payment_id, razorpay_signature});   
        console.log(response.data)
        return response.data;               
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}
