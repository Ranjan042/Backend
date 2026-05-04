import { CreateProduct,GetProducts,GetAllProducts,GetSelectedProduct,AddVarientInProduct} from "../Services/ProductApi.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SetProduct, SetLoading, SetError,SetAllProducts,SetSelectedProduct} from "../State/Productslice.jsx";

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

  

    return { products, allProducts,selectedProduct,cart, loading, error, HandleCreateProduct, HandleGetProducts, HandleGetAllProducts, HandleGetSelectedProduct,HandleAddVarientInProducts};
};