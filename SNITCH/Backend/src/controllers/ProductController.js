import CartModel from "../model/CartSchema.js";
import ProductModel from "../model/ProductModel.js";
import { uploadImage } from "../services/ImageKit.js";
import { StockOfVarint } from "../Dao/ProductDao.js";
import e from "express";


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

export async function AddProductToCartController(req, res) {
    try {
        const { productId, variantId, quantity = 1 } = req.body;
        const UserId = req.user.id;

        const product = await ProductModel.findOne({
            _id: productId,
            "variant._id": variantId
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }

        const stockOfVarint = await StockOfVarint(productId, variantId);

        if (!stockOfVarint) {
            return res.status(404).json({ success: false, message: "Variant Not Found" });
        }

        if (stockOfVarint < quantity) {
            return res.status(400).json({ success: false, message: "Insufficient Stock" });
        }

        let cart = await CartModel.findOne({ user: UserId });

        if (!cart) {
            cart = await CartModel.create({ user: UserId, cartItems: [] });
        }

        const existingItem = cart.cartItems.find(
            item =>
                item.product.toString() === productId &&
                item.varient.toString() === variantId
        );

        if (existingItem) {
            // UPDATE
            if (stockOfVarint < existingItem.quantity + quantity) {
                return res.status(400).json({ success: false, message: "Insufficient Stock" });
            }

            await CartModel.findOneAndUpdate(
                {
                    user: UserId,
                    "cartItems.product": productId,
                    "cartItems.varient": variantId
                },
                {
                    $inc: { "cartItems.$.quantity": quantity }
                },
                { returnDocument: "after" }
            );

        } else {
            // ADD NEW
            await CartModel.findOneAndUpdate(
                { user: UserId },
                {
                    $push: {
                        cartItems: {
                            product: productId,
                            varient: variantId,
                            quantity,
                            price: product.price
                        }
                    }
                },
                { returnDocument: "after" }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Product Added To Cart Successfully"
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function GetCartController(req, res) {
    try {
        const UserId = req.user.id;
        const cart = await CartModel.findOne({ user: UserId }).populate("cartItems.product");

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found", cart: [] });
        }
        return res.status(200).json({ success: true, cart });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function IncreaseProductQuantityController(req, res) {
    try {
        const { productId, variantId } = req.body;
        const UserId = req.user.id;

        const product = await ProductModel.findOne({
            _id: productId,
            "variant._id": variantId
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }

        const cart = await CartModel.findOne({ user: UserId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart Not Found" });
        }

        const stockOfVarint = await StockOfVarint(productId, variantId);

        if (!stockOfVarint) {
            return res.status(404).json({ success: false, message: "Variant Not Found" });
        }

        const existingItem = cart.cartItems.find(
            item =>
                item.product.toString() === productId &&
                item.varient.toString() === variantId
        ).quantity || 0;


        if (stockOfVarint < existingItem + 1) {
            return res.status(400).json({ success: false, message: "Insufficient Stock" });
        }

        await CartModel.findOneAndUpdate(
            {
                user: UserId,
                "cartItems.product": productId,
                "cartItems.varient": variantId
            },
            {
                $inc: { "cartItems.$.quantity": 1 }
            },
            { new: true },
        );

        return res.status(200).json({
            success: true,
            message: "Product Quantity Updated Successfully"
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

export async function DecreaseProductQuantityController(req, res) {
    try {
        const { productId, variantId } = req.body;
        const UserId = req.user.id;

        const product = await ProductModel.findOne({
            _id: productId,
            "variant._id": variantId
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }

        const cart = await CartModel.findOne({ user: UserId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart Not Found" });
        }

        const stockOfVarint = await StockOfVarint(productId, variantId);

        if (!stockOfVarint) {
            return res.status(404).json({ success: false, message: "Variant Not Found" });
        }

        const existingItem = cart.cartItems.find(
            item =>
                item.product.toString() === productId &&
                item.varient.toString() === variantId
        ).quantity || 0;    

        if (existingItem <= 1) {
            return res.status(400).json({ success: false, message: "Minimum Quantity Reached" });
        }

        await CartModel.findOneAndUpdate(
            {
                user: UserId,
                "cartItems.product": productId,
                "cartItems.varient": variantId
            },
            {
                $inc: { "cartItems.$.quantity": -1 }
            },
            { new: true },
        );

        return res.status(200).json({
            success: true,
            message: "Product Quantity Updated Successfully"
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }

}  

export async function RemoveProductFromCartController(req, res) {
    try {
        console.log(req.params)
        const { productId, variantId } = req.params;
        const UserId = req.user.id;

        const updatedCart = await CartModel.findOneAndUpdate(
            {
                user: UserId,
                "cartItems.product": productId,
                "cartItems.varient": variantId
            },
            {
                $pull: {
                    cartItems: {
                        product: productId,
                        varient: variantId
                    }
                }
            },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart or cart does not exist"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Removed From Cart Successfully",
            cart: updatedCart
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




