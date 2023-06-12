import { usersModel } from "../persistence/mongoDB/models/usersModel.js";
import usersService from "../service/users.service.js";
import { generateToken } from "../utils.js";
import logger from "../Utils/winston.js";

class UsersController {
  createUser = async (req, res) => {
    const user = req.body;
    try {
      const newUser = await usersService.createUser(user);
      res.json({ message: "Usuario creado", newUser });
    } catch (error) {
      res.json({ message: "Error en el users controller CREATE" });
    }
  };

  findAll = async (req, res) => {
    try {
      const findAll = await usersService.findAll();
      res.send({ message: "usuarios encontrados:", findAll });
    } catch (error) {
      res.json({ message: "Error en el users controller find all" });
    }
  };

  findOne = async (req, res) => {
    const { id } = req.params;
    try {
      const findOne = await usersService.findOne(id);
      res.json({ message: "usuario encontrado con exito", findOne });
    } catch (error) {
      res.json({ message: "Error en el users controller find one" });
    }
  };

  updateOne = async (req, res) => {
    const { id } = req.params;
    const { obj } = req.body;
    try {
      const updateOne = await usersService.updateOne(id, obj);
      res.json({ message: "usuario actualizado con exito", updateOne });
    } catch (error) {
      res.json({ message: "Error en el users controller update one" });
    }
  };

  changeRole = async (req, res) => {
    const { uid } = req.params;
    try {
      const user = await usersModel.findById(uid);
      const userRole = user.role
      switch(userRole){
        case 'User':
          await usersModel.findByIdAndUpdate(uid,{$set:{role:'Premium user'}})
          res.json({message:`El usuario ${user.firstName} ha cambiado su rol Premium`})
          break;
        case 'Premium user':
          await usersModel.findByIdAndUpdate(uid,{$set:{role:'User'}})
          res.json({message:`El usuario ${user.firstName} ha cambiado rol a User`})
          break;
      }
    } catch (error) {
      res.json({ message: "Error en el chage role controller" });
    }
  };

  deleteById = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteById = await usersService.deleteById(id);
      res.json({ message: "usuario eliminado con exito", deleteById });
    } catch (error) {
      res.json({ message: "Error en el users controller  delete one" });
    }
  };

  loginUser = async (req, res) => {
    const obj = req.body;
    try {
      const user = await usersService.loginUser(obj);
      if (user) {
        const token = generateToken(user);
        res.cookie("cookieLogin", token);
        res.render("perfil", { user });
      } else {
        res.send("No puede iniciar sesion sin ingresar los datos necesarios.");
      }
    } catch (error) {
      logger.error("Error en el login");
      res.send(
        "No puede iniciar sesion sin ingresar los datos correspondientes."
      );
    }
  };
}

export default new UsersController();