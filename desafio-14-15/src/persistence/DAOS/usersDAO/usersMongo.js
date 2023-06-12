import BasicMongo from "../BasicMongo.js";
import { usersModel } from "../../mongoDB/models/usersModel.js";
import { comparePasswords, hashPassword } from "../../../utils.js";
import config from "../../../config.js";
import logger from "../../../Utils/winston.js";

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

class UsersMongo extends BasicMongo {
  constructor(model) {
    super(model);
  }
  async createUser(user) {
    const { email, password, firstName, lastName, age, role } = user;
    try {
      const existUser = await this.model.find({ email });
      if (existUser.length === 0) {
        const newUser = {
          firstName,
          lastName,
          age,
          email,
          role,
          password: await hashPassword(password),
        };
        if (user.email.includes("@coder.com") && user.password === ADMIN_PASSWORD){
          (newUser.role = "Admin"), (newUser.isAdmin = true);
        }
        if(user.email.includes("@premium.com")){
          (newUser.role = "Premium user")
        }
        await this.model.create(newUser);
        logger.info(`Nuevo usuario: ${newUser.firstName} ${newUser.lastName}`);
        return newUser;
      } else {
        return logger.error("error en el create user");
      }
    } catch (error) {
      return error;
    }
  }

  async loginUser(user) {
    const { email, password } = user;
    if (!email | !password) {
      logger.error("No se ingresaron los datos");
    } else {
      const user = await this.model.findOne({ email });
      if (user) {
        const compare = await comparePasswords(password, user.password);
        if (compare) {
          logger.info(`usuario logueado: ${user.email}`);
          return user;
        } else {
          logger.error("La contrasenia es incorrecta");
        }
      } else {
        logger.error("datos incorrectos");
      }
    }
  }
}

export default new UsersMongo(usersModel);