import { useDispatch } from "react-redux";
import { SetCart, SetincreaseProductQuantity, SetDecreaseProductQuantity, SetLoadinginCart, SetErrorinCart } from "../Store/CartSlice.jsx";
import { GetCart, RemoveFromCart, AddToCart, IncreaseProductQuantity, DecreaseProductQuantity, CreateCartOrder,VerifyCartOrder} from "../Service/CartApi.jsx";

export const UseCart = () => {
    const dispatch = useDispatch();  

    const HandleAddToCart = async (productId,variantId) => {
        dispatch(SetLoadinginCart(true));
        dispatch(SetErrorinCart(null));
        try {
            const response = await AddToCart(productId,variantId);
            dispatch(SetCart(response.cart));
        } catch (error) {
            dispatch(SetErrorinCart(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoadinginCart(false));
        }
    };

    const HandleGetCart = async () => {
        dispatch(SetLoadinginCart(true));
        dispatch(SetErrorinCart(null));
        try {
            const response = await GetCart();
            dispatch(SetCart(response.cart));
        } catch (error) {
            dispatch(SetErrorinCart(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoadinginCart(false));
        }
    };

    const HandleIncreaseProductQuantity = async (productId,variantId) => {
        dispatch(SetLoadinginCart(true));
        dispatch(SetErrorinCart(null));
        try {
            const response = await IncreaseProductQuantity(productId,variantId);
            if(response.success){
                dispatch(SetincreaseProductQuantity({productId, variantId }));
            }
        } catch (error) {
            dispatch(SetErrorinCart(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoadinginCart(false));
        }
    };

    const HandleDecreaseProductQuantity = async (productId,variantId) => {
        dispatch(SetLoadinginCart(true));
        dispatch(SetErrorinCart(null));
        try {
            const response = await DecreaseProductQuantity(productId,variantId);
                if(response.success){
                    dispatch(SetDecreaseProductQuantity({productId, variantId }));
                }
        } catch (error) {
            dispatch(SetErrorinCart(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoadinginCart(false));
        }
    };

    const HandleRemoveFromCart = async (productId,variantId) => {
        dispatch(SetLoadinginCart(true));
        dispatch(SetErrorinCart(null));
        try {
            const response = await RemoveFromCart(productId,variantId);
                if(response.success){
                    dispatch(SetCart(response.cart));
                }
        } catch (error) {
            dispatch(SetErrorinCart(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoadinginCart(false));
        }
    };
    
    const HandleCreateCartOrder=async()=>{
        try {
            const response=await CreateCartOrder();
            return response.order;
        } catch (error) {
            console.log(error.message)
            return error.response.data;
        }
    }

    const HandleVerifyCartOrder=async({razorpay_order_id, razorpay_payment_id, razorpay_signature})=>{
        try {
            const response=await VerifyCartOrder({razorpay_order_id, razorpay_payment_id, razorpay_signature});
            return response.success;
        } catch (error) {
            console.log(error.message)
            return error.response.data;
        }
    }

    return {HandleAddToCart,HandleGetCart,HandleIncreaseProductQuantity,HandleDecreaseProductQuantity,HandleRemoveFromCart,HandleCreateCartOrder,HandleVerifyCartOrder};
};  