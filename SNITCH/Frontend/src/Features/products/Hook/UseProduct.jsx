import { CreateProduct,GetProducts,GetAllProducts} from "../Services/ProductApi.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SetProduct, SetLoading, SetError,SetAllProducts } from "../State/Productslice.jsx";

export const useProduct = () => {
    const dispatch = useDispatch();
    const { products, loading, error, allProducts } = useSelector((state) => state.product);

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
    return { products, allProducts, loading, error, HandleCreateProduct, HandleGetProducts, HandleGetAllProducts };
};