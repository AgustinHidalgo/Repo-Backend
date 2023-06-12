import usersController from '../controllers/users.controller.js'
import { Router } from "express";

class UsersRouter {
  constructor(){
    this.usersRouter = Router()
    this.usersRouter.get('/', usersController.findAll)
    this.usersRouter.get('/:uid', usersController.findOne)
    this.usersRouter.post('/login', usersController.loginUser)
    this.usersRouter.post('/registro', usersController.createUser)
    this.usersRouter.put('/:uid', usersController.updateOne)
    this.usersRouter.put('/premium/:uid', usersController.changeRole)
    this.usersRouter.delete('/:uid', usersController.deleteById)
  }

  getRouter(){
    return this.usersRouter
  }
}

export default new UsersRouter()