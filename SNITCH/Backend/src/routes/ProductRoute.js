import { Router } from "express";
import { isSellerAuthenticated, isUserAuthenticated } from "../middlewares/AuthMiddleware.js";
import { upload } from "../services/ImageKit.js";
import { AddProductToCartController, AddVarientsController, CreatePostController, DecreaseProductQuantityController, GetAllProductsController, GetCartController, GetProductByIdController, GetProductsController, IncreaseProductQuantityController, RemoveProductFromCartController } from "../controllers/ProductController.js";
import { validateImages } from "../validators/ImageValidator.js";
import { ProductValidator } from "../validators/ProductValidator.js";

const ProductRouter = Router();

ProductRouter.post("/create",isSellerAuthenticated,upload.array("images",7),ProductValidator,validateImages,CreatePostController);

ProductRouter.get("/seller/products",isSellerAuthenticated,GetProductsController);

ProductRouter.get("/all",GetAllProductsController);

ProductRouter.get("/product/:id",GetProductByIdController);

ProductRouter.post("/addtocart",isUserAuthenticated,AddProductToCartController);

ProductRouter.get("/cart",isUserAuthenticated,GetCartController);

ProductRouter.post("/:productId/varients",isSellerAuthenticated,upload.array("images",7),validateImages,AddVarientsController);

ProductRouter.post("/increment",isUserAuthenticated,IncreaseProductQuantityController);

ProductRouter.post("/decrement",isUserAuthenticated,DecreaseProductQuantityController);

ProductRouter.delete("/removefromcart/:productId/:variantId",isUserAuthenticated,RemoveProductFromCartController);

export default ProductRouter;