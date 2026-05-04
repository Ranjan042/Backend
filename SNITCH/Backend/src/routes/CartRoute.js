import { Router } from "express";
import { isUserAuthenticated } from "../middlewares/AuthMiddleware.js";
import { AddProductToCartController,GetCartController,IncreaseProductQuantityController,DecreaseProductQuantityController,RemoveProductFromCartController,GetCartUsingAggregateController,CreateOrderController, VerifyOrderController} from "../controllers/CartController.js";
const CartRouter = Router();


CartRouter.get("/",isUserAuthenticated,GetCartUsingAggregateController);
// CartRouter.get("/",isUserAuthenticated,GetCartController);

CartRouter.post("/addtocart",isUserAuthenticated,AddProductToCartController);

CartRouter.post("/increment",isUserAuthenticated,IncreaseProductQuantityController);

CartRouter.post("/decrement",isUserAuthenticated,DecreaseProductQuantityController);

CartRouter.delete("/removefromcart/:productId/:variantId",isUserAuthenticated,RemoveProductFromCartController);

CartRouter.post("/payment/create-order",isUserAuthenticated,CreateOrderController);

CartRouter.post("/payment/verify-order",isUserAuthenticated,VerifyOrderController);

export default CartRouter;