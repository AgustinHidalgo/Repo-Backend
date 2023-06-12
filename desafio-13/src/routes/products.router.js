import { checkRoleAuth, checkAuth } from "../middlewares/auth.js";
import productsController from "../controllers/products.controller.js";
import { Router } from "express";
import { ErrorMiddleware } from "../Utils/CustomErrors/ErrorsMiddleware.js";

class ProductsRouter {
  constructor(){
    this.productsRouter = Router()
    this.productsRouter.get('/', productsController.findAll)
    this.productsRouter.get('/:pid', productsController.findOne)
    this.productsRouter.post('/',checkAuth, checkRoleAuth(['Admin','Premium user']),productsController.create)
    this.productsRouter.put('/:pid',checkAuth, checkRoleAuth(['Admin']),productsController.updateOne)
    this.productsRouter.delete('/:pid',checkAuth,checkRoleAuth(['Admin']),productsController.deleteById)
  }

  getRouter(){
    return this.productsRouter
  }
}

export default new ProductsRouter()