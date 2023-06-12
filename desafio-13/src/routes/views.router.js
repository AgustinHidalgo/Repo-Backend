import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import usersService from "../service/users.service.js";
import cartsController from "../controllers/carts.controller.js";

class ViewsRouter {
  constructor() {
    this.viewsRouter = Router();
    this.viewsRouter.get("/", async (req, res) => {
      res.render("login");
    });
    this.viewsRouter.get("/registro", async (req, res) => {
      res.render("registro");
    });
    this.viewsRouter.get("/errorLogin", async (req, res) => {
      res.render("errorLogin");
    });
    this.viewsRouter.get("/errorRegistro", async (req, res) => {
      res.render("errorRegistro");
    });
    this.viewsRouter.get("/restart", async (req, res) => {
      res.render("restart");
    });
    this.viewsRouter.get("/newpassword", async (req,res) => {
      res.render("newpassword")
    })
    this.viewsRouter.get("/carts/:cid", async (req, res) => {
      const cart = await cartsController.findAll();
      res.render("cart", cart);
    });
  }

  getRouter() {
    return this.viewsRouter;
  }
}

export default new ViewsRouter();