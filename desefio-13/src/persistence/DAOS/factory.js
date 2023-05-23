import UsersRepository from "../repositories/users.repository.js";
import UsersMongo from "./usersDAO/usersMongo.js";

let UsersDao = new UsersRepository(UsersMongo)
export default UsersDao