import { UserDTO } from "../DTO/user.dto.js";
import { UserDTOResponse } from "../DTO/usersResp.dto.js";

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createUser(user) {
    const userDTO = new UserDTO(user);
    await this.dao.createUser(userDTO);
    const UserDTOResp = new UserDTOResponse(userDTO);
    console.log(UserDTOResp);
    return UserDTOResp;
  }
}