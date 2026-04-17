import ProductModel from "../model/ProductModel.js";
import { uploadImage } from "../services/ImageKit.js";


export async function CreatePostController(req, res) {
    try {
        const { title, description, priceAmount, priceCurrency } = req.body;
        const seller = req.user;
    
        const imagesUrl=await Promise.all(req.files.map((file) => uploadImage(file)));

        const images = imagesUrl.map((url) => ({ url }));

        const product = await ProductModel.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency || "INR",
            },
            seller: seller._id,
            images
        });

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (error) {
        console.log("Error creating product:");
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function GetProductsController(req, res) {
    try {
        const UserId=req.user._id;
        const products=await ProductModel.find({seller:UserId});
        if(!products){
            return res.status(404).json({message:"Products Not Found"});
        }
        return res.status(200).json({success:true,products});

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}