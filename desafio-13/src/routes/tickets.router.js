import { Router } from "express";
import ticketsController from "../controllers/tickets.controller.js";

class TicketsRouter{
    constructor(){
        this.ticketsRouter = Router()
        this.ticketsRouter.post('/', ticketsController.create);
        this.ticketsRouter.get('/', ticketsController.findAll);
        this.ticketsRouter.get('/:id',  ticketsController.findOne);
        this.ticketsRouter.put('/:id', ticketsController.updateOne);
        this.ticketsRouter.delete('/:id', ticketsController.deleteById);
    }

    getRouter(){
        return this.ordersRouter
    }
}

export default new TicketsRouter()