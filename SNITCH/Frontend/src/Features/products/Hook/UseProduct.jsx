import { CreateProduct,GetProducts,GetAllProducts,GetSelectedProduct,AddToCart,GetCart,AddVarientInProduct,IncreaseProductQuantity,DecreaseProductQuantity,RemoveFromCart} from "../Services/ProductApi.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SetProduct, SetLoading, SetError,SetAllProducts,SetSelectedProduct,setCart,SetincreaseProductQuantity,SetDecreaseProductQuantity} from "../State/Productslice.jsx";

export const useProduct = () => {
    const dispatch = useDispatch();
    const { products, loading, error, allProducts,selectedProduct,cart } = useSelector((state) => state.product);

    const HandleCreateProduct = async (formData) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await CreateProduct(formData);
            dispatch(SetProduct(response.product));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleAddVarientInProducts= async (productId, formData) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await AddVarientInProduct(productId, formData);
            dispatch(SetProduct(response.product));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleGetProducts = async () => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await GetProducts();
            dispatch(SetProduct(response.products));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleGetAllProducts = async () => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await GetAllProducts();
            dispatch(SetAllProducts(response.products));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleGetSelectedProduct = async (id) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await GetSelectedProduct(id);
            dispatch(SetSelectedProduct(response.product));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleAddToCart = async (productId,variantId) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await AddToCart(productId,variantId);
            dispatch(setCart(response.cart));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleGetCart = async () => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await GetCart();
            dispatch(setCart(response.cart));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleIncreaseProductQuantity = async (productId,variantId) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await IncreaseProductQuantity(productId,variantId);
            if(response.success){
                dispatch(SetincreaseProductQuantity({productId, variantId }));
            }
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleDecreaseProductQuantity = async (productId,variantId) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await DecreaseProductQuantity(productId,variantId);
                if(response.success){
                    dispatch(SetDecreaseProductQuantity({productId, variantId }));
                }
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleRemoveFromCart = async (productId,variantId) => {

        console.log(productId,"||",variantId)
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await RemoveFromCart(productId,variantId);
                if(response.success){
                    dispatch(setCart(response.cart));
                }
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Product creation failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    return { products, allProducts,selectedProduct,cart, loading, error, HandleCreateProduct, HandleGetProducts, HandleGetAllProducts, HandleGetSelectedProduct,HandleAddVarientInProducts, HandleAddToCart,HandleGetCart,HandleIncreaseProductQuantity, HandleDecreaseProductQuantity,HandleRemoveFromCart };
};