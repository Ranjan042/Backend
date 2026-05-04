import axios from "axios";

const ProductApi = axios.create({
    baseURL: "/api/products",
    withCredentials: true,
});

export async function CreateProduct(formData) {
    try {
        const response = await ProductApi.post("/create", formData);
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
    
}

export async function AddVarientInProduct(productId, formData) {
    try {
        const response = await ProductApi.post(`/${productId}/varients`, formData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function GetProducts() {
    try {
        const response = await ProductApi.get("/seller/products");
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
    
}

export async function GetAllProducts() {
    try {
        const response = await ProductApi.get("/all");
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }

}
 
export async function GetSelectedProduct(id) {
    try {
        const response = await ProductApi.get(`/product/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}
