import { Router } from "express";
import { isSellerAuthenticated, isUserAuthenticated } from "../middlewares/AuthMiddleware.js";
import { upload } from "../services/ImageKit.js";
import { AddVarientsController, CreatePostController, GetAllProductsController, GetProductByIdController, GetProductsController } from "../controllers/ProductController.js";
import { validateImages } from "../validators/ImageValidator.js";
import { ProductValidator } from "../validators/ProductValidator.js";

const ProductRouter = Router();

ProductRouter.post("/create",isSellerAuthenticated,upload.array("images",7),ProductValidator,validateImages,CreatePostController);

ProductRouter.post("/:productId/varients",isSellerAuthenticated,upload.array("images",7),validateImages,AddVarientsController);

ProductRouter.get("/seller/products",isSellerAuthenticated,GetProductsController);

ProductRouter.get("/all",GetAllProductsController);

ProductRouter.get("/product/:id",GetProductByIdController);


export default ProductRouter;