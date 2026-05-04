import mongoose from "mongoose"
import CartModel from "../model/CartSchema.js";
import ProductModel from "../model/ProductModel.js";
import { uploadImage } from "../services/ImageKit.js";
import { StockOfVarint } from "../Dao/ProductDao.js";
import { createOrder } from "../services/PaymentService.js";
import PaymentModel from "../model/PaymentModel.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import CONFIG from "../config/config.js";

export async function AddProductToCartController(req, res) {
    try {
        const { productId, variantId, quantity = 1 } = req.body;
        const UserId = req.user.id;

        const product = await ProductModel.findOne({
            _id: productId,
            "variant._id": variantId
        });

        console.log(product)

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
                            price:product.variant.find(v => v._id.toString() === variantId.toString()).price || product.price,
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
        console.log(JSON.stringify(cart))
        return res.status(200).json({ success: true, cart });


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function GetUserCartDetails(userId) {
    const cart = await CartModel.aggregate(
  [
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId) // Replace with actual user ID
      }
    },
    { $unwind: { path: '$cartItems' } },
    {
      $lookup: {
        from: 'products',
        localField: 'cartItems.product',
        foreignField: '_id',
        as: 'cartItems.product'
      }
    },
    { $unwind: { path: '$cartItems.product' } },
    {
      $unwind: {
        path: '$cartItems.product.variant'
      }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$cartItems.varient',
            '$cartItems.product.variant._id'
          ]
        }
      }
    },
    {
      $addFields: {
        itemPrice: {
          price: {
            $multiply: [
              '$cartItems.quantity',
              '$cartItems.product.variant.price.amount'
            ]
          },
          currency:
            '$cartItems.product.variant.price.currency'
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        totalPrice: { $sum: '$itemPrice.price' },
        currency: {
          $first: '$itemPrice.currency'
        },
        cartItems: { $push: '$cartItems' }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
    return cart[0];
}

export async function GetCartUsingAggregateController(req, res) {
    try {
        const UserId = req.user.id;
        const cart = await GetUserCartDetails(UserId);
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found", cart: [] });
        }
        return res.status(200).json({ success: true, cart });
        // console.log(JSON.stringify(cart))

    } catch (error) {
        console.log("Error in Agg")
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
        ).quantity || 1;


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
        ).quantity || 1;    

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

export async function CreateOrderController(req, res) {
        try {
            const cart= await GetUserCartDetails(req.user.id);

            console.log("Cart in createOrderController",cart)

            if(!cart || cart.cartItems.length===0){
                return res.status(400).json({ success: false, message: "Cart is empty" });
            }

            console.log("cart in order controller",cart)


            const order = await createOrder({amount:cart.totalPrice, currency:cart.currency});

            // const exis
            const payment=await PaymentModel.create({
                user:req.user.id,
                razorpay:{
                    orderId: order.id,
                },
                price:{
                    amount:cart.totalPrice,
                    currency:cart.currency,
                },
                orderedItems:cart.cartItems.map(item=>({
                    title:item.product.title,
                    productId:item.product._id,
                    variantId:item.varient,
                    quantity:item.quantity,
                    images:item.product.variant.images || item.product.images,
                    description:item.product.description,
                    price:{
                        amount:item.product.variant.price.amount || item.product.price.amount,
                        currency:item.product.variant.price.currency || item.product.price.currency,
                    }
                }))
            });

            return res.status(200).json({ success: true, message: "Order Created Successfully", order });   
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
}

export async function VerifyOrderController(req,res){
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;    

        const payment = await PaymentModel.findOne({ "razorpay.orderId": razorpay_order_id, status: "pending"});

        console.log("payment in VerifyOrderController",payment)

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment Not Found" });
        }

        const existingPayment = await PaymentModel.findOne({ "razorpay.paymentId": razorpay_payment_id });

        if (existingPayment) {
            return res.status(400).json({ success: false, message: "Payment Already Processed" });
        }

      const isPaymentValid = validatePaymentVerification({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,  
      },razorpay_signature, CONFIG.RPAY_KEY_SECRET);

        if (!isPaymentValid) {
            payment.status = "failed";
            await payment.save();
            return res.status(400).json({ success: false, message: "Payment Verification Failed" });
        }   

        payment.status = "completed";
        payment.razorpay.paymentId = razorpay_payment_id;
        payment.razorpay.signature = razorpay_signature;
        await payment.save();

        await CartModel.findOneAndUpdate(
            { user: payment.user },
            { $set: { cartItems: [] } },
        );

        for(const item of payment.orderedItems){
            const product = await ProductModel.findById(item.productId);
            if(!product) continue;

            if(!item.variantId){
                if(product.stock < item.quantity){
                    console.log(`Insufficient stock for product ${product._id}, variant ${item.variantId}`);
                    throw new Error(`Insufficient stock for product ${product._id}, variant ${item.variantId}`);
                }
                product.stock -= item.quantity;
            }else{
                const variant = product.variant.id(item.variantId);
                if(variant.stock < item.quantity){
                    console.log(`Insufficient stock for product ${product._id}, variant ${item.variantId}`);
                    throw new Error(`Insufficient stock for product ${product._id}, variant ${item.variantId}`);
                }
                variant.stock -= item.quantity;
            }
            await product.save();

        }

        return res.status(200).json({ success: true, message: "Payment Verified Successfully" });
            
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}