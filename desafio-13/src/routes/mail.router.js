import { Router } from "express";
import mailController from "../controllers/mail.controller.js";

class MailRouter {
    constructor(){
        this.mailRouter = Router()
        this.mailRouter.post('/', mailController.sendEmailResetPassword)
        this.mailRouter.put('/reset', mailController.resetPassword)
    }

    getRouter(){
        return this.mailRouter
    }
}

export default new MailRouter();