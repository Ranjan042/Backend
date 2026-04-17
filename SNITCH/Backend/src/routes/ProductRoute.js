import { Router } from "express";
import { isSellerAuthenticated } from "../middlewares/AuthMiddleware.js";
import { upload } from "../services/ImageKit.js";
import { CreatePostController, GetAllProductsController, GetProductsController } from "../controllers/ProductController.js";
import { validateImages } from "../validators/ImageValidator.js";
import { ProductValidator } from "../validators/ProductValidator.js";

const ProductRouter = Router();

ProductRouter.post("/create",isSellerAuthenticated,upload.array("images",7),ProductValidator,validateImages,CreatePostController);

ProductRouter.get("/seller/products",isSellerAuthenticated,GetProductsController);

ProductRouter.get("/all",GetAllProductsController);

export default ProductRouter;