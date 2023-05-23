import UsersMongo from '../persistence/DAOS/usersDAO/usersMongo.js'
import UsersDao from '../persistence/DAOS/factory.js';

class UsersService{
    constructor(dao){
        this.dao = dao
    }

    createUser = async (user) => {
        const newUser = await UsersDao.createUser(user)
        return newUser
    };
    
    findOne = async (id) => {
        const findOne = await UsersMongo.findOne(id)
        return findOne
    };

    resetPassword = async (email, newPassword) => {
        const resetPassword = await UsersMongo.resetPassword(email, newPassword)
        return resetPassword
    }

    findAll = async () => {
        const findAll = await UsersMongo.findAll()
        return findAll
    };

    updateOne = async (id,obj) => {
        const updateOne = await UsersMongo.updateOne(id,obj)
        return updateOne
    };

    findById = async (id) => {
        const findUser = await UsersMongo.findOne(id)
        return findUser
    }

    deleteById = async(id) => {
        const findById = await UsersMongo.deleteById(id)
        return findById
    };

    loginUser = async(user) => {
        const loginUser = await UsersMongo.loginUser(user)
        return loginUser
    };
}

export default new UsersService(UsersMongo)