import ProductModel from "../model/ProductModel.js";
import { uploadImage } from "../services/ImageKit.js";

export async function CreatePostController(req, res) {
    try {
        const { title, description, priceAmount, priceCurrency } = req.body;
        const seller = req.user;

        const imagesUrl = await Promise.all(req.files.map((file) => uploadImage(file)));

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

export async function AddVarientsController(req, res) {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const product = await ProductModel.findOne({ _id: productId, seller: userId });

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        const priceAmount = req.body.priceAmount;
        const priceCurrency = req.body.priceCurrency || "INR";
        const stock = Number(req.body.stock) || 0;
        const attributes = { ...req.body.attributes };

        const files = req.files || [];
        const imagesUrl = await Promise.all(files.map((file) => uploadImage(file)));
        const images = imagesUrl.map((url) => ({ url }));

        product.variant.push({
            price: {
                amount: priceAmount || product.price.amount,
                currency: priceCurrency || product.price.currency,
            },
            stock: stock,
            attributes,
            images
        });

        await product.save();

        return res.status(200).json({ message: "Product Varient Added Successfully", success: true, product });

    } catch (err) {
        console.log(err.message);
        console.log(err.stack)
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

export async function GetProductsController(req, res) {
    try {
        const UserId = req.user._id;
        const products = await ProductModel.find({ seller: UserId });
        if (!products) {
            return res.status(404).json({ message: "Products Not Found" });
        }
        return res.status(200).json({ success: true, products });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function GetAllProductsController(req, res) {
    try {
        const products = await ProductModel.find();
        if (!products) {
            return res.status(404).json({ message: "Products Not Found" });
        }
        return res.status(200).json({ success: true, products });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function GetProductByIdController(req, res) {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        return res.status(200).json({ success: true, product });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}





