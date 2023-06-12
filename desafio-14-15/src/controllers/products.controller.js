import productsService from "../service/products.service.js";
import usersService from "../service/users.service.js";
import { verifyToken } from "../utils.js";
import CustomError from "../Utils/CustomErrors/CustomErrors.js";
import {
  ErrorName,
  ErrorMessage,
  ErrorCause,
} from "../Utils/CustomErrors/ErrorsEnum.js";
import logger from "../Utils/winston.js";

class ProductsController {
  create = async (req, res) => {
    const token = req.headers.authorization.split(" ").pop();
    const { title, description, code, price, status, stock, category, owner } =
      req.body;
    if (!title || !price) {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_DATA_INCOMPLETE,
        message: ErrorMessage.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorCause.PRODUCT_DATA_INCOMPLETE,
      });
    } else {
      try {
        const tokenData = await verifyToken(token);
        const idOwner = tokenData.user._id;
        const newProduct = await productsService.create({
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          owner: idOwner,
        });
        res.json({ message: "Producto creado con exito", newProduct });
        logger.info("producto creado con exito");
      } catch (error) {
        res.json({ message: "Error en el product controller CREATE" });
        logger.error("error al intentar crear el producto");
      }
    }
  };

  findAll = async (req, res) => {
    try {
      const products = await productsService.findAll();
      res.render("products", { products });
    } catch (error) {
      res.send({ message: "Error en el products controller find all" });
    }
  };

  findOne = async (req, res) => {
    const { id } = req.params;
    try {
      const findOne = await productsService.findOne(id);
      res.json({ message: "Producto encontrado con exito", findOne });
    } catch (error) {
      res.json({ message: "Error en el products controller find one" });
    }
  };

  updateOne = async (req, res) => {
    const { id } = req.params;
    const { obj } = req.body;
    try {
      const updateOne = await productsService.updateOne(id, obj);
      res.json({ message: "Producto actualzado con exito", updateOne });
    } catch (error) {
      res.json({ message: "Error en el products controller update one" });
    }
  };

  deleteById = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteById = await productsService.deleteById(id);
      res.json({ message: "Producto eliminado con exito", deleteById });
    } catch (error) {
      res.json({ message: "Error en el products controller delete one" });
    }
  };

}

export default new ProductsController();