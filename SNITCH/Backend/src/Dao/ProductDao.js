import ProductModel from "../model/ProductModel.js";

export const StockOfVarint=async(productId,varientId)=>{    
    const product=await ProductModel.findOne({_id: productId, "variant._id": varientId});
    const varientStock=product.variant.find((varient)=>varient._id.toString()===varientId).stock;
    return varientStock;
}
