import WishlistModel from "../models/WishlistModel.js";

export const AddToWishList = async (req, res) => {
    try {
        const { productId, variantId=null } = req.body;
        const UserId = req.user.id;

        let wishlist = await WishlistModel.findOne({ user: UserId });

        if (!wishlist) {
            wishlist = await WishlistModel.create({ user: UserId, wishlistItems: [] });
        }

        const existingItem = wishlist.wishlistItems.find(item=>{
            if(variantId){
                return item.productId.toString() === productId && item.varientId.toString() === variantId;
            }else{
                return item.productId.toString() === productId && item.varientId === null;
            }
        });

        if (existingItem) {
            return res.status(400).json({ success: false, message: "Product already in wishlist" });
        }

        wishlist.wishlistItems.push({ productId, varientId });
        await wishlist.save();

        return res.status(200).json({ success: true, message: "Product added to wishlist" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }    
}

export const GetWishList = async (req, res) => {
    try {
        const UserId = req.user.id;
        const wishlist = await WishlistModel.findOne({ user: UserId }).populate({ path: "wishlistItems.productId", model: "Product" }).populate({ path: "wishlistItems.varientId", model: "Varient" });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        return res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const RemoveFromWishList = async (req, res) => {
    try {
        const { productId, variantId=null } = req.body;
        const UserId = req.user.id;

        const wishlist = await WishlistModel.findOne({ user: UserId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }   

        const existingItem = wishlist.wishlistItems.find(item=>{
            if(variantId){
                return item.productId.toString() === productId && item.varientId.toString() === variantId;
            }else{
                return item.productId.toString() === productId && item.varientId === null;
            }
        });

        if (!existingItem) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }

        wishlist.wishlistItems.pull(existingItem);
        await wishlist.save();

        return res.status(200).json({ success: true, message: "Product removed from wishlist" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}