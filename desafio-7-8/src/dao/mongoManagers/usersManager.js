import { usersModel } from "../models/usersModel.js";
import { comparePasswords } from "../../utils.js";
import { hashPassword } from "../../utils.js";

export default class UsersManager {
  async createUser(user) {
    const { email, password } = user;
    try {
      const existUser = await usersModel.find({ email });
      if (existUser.length === 0) {
        const hashedPassword = await hashPassword(password)
        const newUser = {
          ...user, password: hashedPassword
        }
        await usersModel.create(newUser)
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async loginUser(user) {
    const { email, password } = user;
    try {
      const user = await usersModel.findOne({ email });
      if (user) {
        const passwords = comparePasswords(password, user.password);
        if (passwords) {
          console.log(user)
          return user;
        }
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }
}