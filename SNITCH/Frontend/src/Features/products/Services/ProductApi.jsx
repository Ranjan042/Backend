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
        console.log(response.data)
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

export async function AddToCart(productId,variantId) {
    try {
        console.log("productId",productId);
        console.log("variantId",variantId)
        const response = await ProductApi.post("/addtocart",{productId,variantId});
        console.log(response.data)      
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function GetCart() {
    try {
        const response = await ProductApi.get("/cart");
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function IncreaseProductQuantity(productId,variantId) {
    try {
        const response = await ProductApi.post("/increment",{productId,variantId});
        
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function DecreaseProductQuantity(productId,variantId) {
    try {
        const response = await ProductApi.post("/decrement",{productId,variantId});
        console.log(response.data)      
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}

export async function RemoveFromCart(productId,variantId) {
    console.log(productId," $$ ",variantId)
    try {
        const response = await ProductApi.delete(`/removefromcart/${productId}/${variantId}`);
        console.log(response.data)      
        return response.data;
    } catch (error) {
        console.log(error.message)
        return error.response.data;
    }
}