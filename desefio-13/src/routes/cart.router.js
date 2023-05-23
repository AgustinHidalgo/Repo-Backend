import cartsController from "../controllers/carts.controller.js";
import { Router } from "express";
import ticketsController from "../controllers/tickets.controller.js";

class CartsRouter {
  constructor(){
    this.cartsRouter = Router()
    this.cartsRouter.get('/', cartsController.findAll)
    this.cartsRouter.get('/:cid', cartsController.findOne)
    this.cartsRouter.post('/', cartsController.create)
    this.cartsRouter.post('/:cid/purchase', ticketsController.create)
    this.cartsRouter.post('/:cid/products/:pid',cartsController.AddProductInCart)
    this.cartsRouter.put('/:cid', cartsController.updateOne)
    this.cartsRouter.delete('/:cid', cartsController.deleteById)
    this.cartsRouter.delete('/:cid',cartsController.deleteProductInCart)
  }

  getRouter(){
    return this.cartsRouter
  }
}

export default new CartsRouter()