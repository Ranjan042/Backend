import { CreateProduct,GetProducts} from "../Services/ProductApi.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SetProduct, SetLoading, SetError } from "../State/Productslice.jsx";

export const useProduct = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);

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

    return { products, loading, error, HandleCreateProduct, HandleGetProducts };
};