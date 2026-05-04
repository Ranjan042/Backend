import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    wishlistItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            varientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Varient",
                default: null,
                required: true,
            },
        },
    ],
}, { timestamps: true });

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);
export default WishlistModel;