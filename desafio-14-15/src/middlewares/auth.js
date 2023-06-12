import { ProductsModel } from "../persistence/mongoDB/models/products.model.js"
import { usersModel } from "../persistence/mongoDB/models/usersModel.js"
import { verifyToken } from "../utils.js"

export const checkAuth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if(tokenData.user._id){
            next()
        }else{
            res.send({error: 'Vos no figuras rey'})
        }
    } catch (error) {
        return error
    }
}

export const checkRoleAuth = (role) => async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await usersModel.findById(tokenData.user._id)
        if([].concat(role).includes(userData.role)){
            next()
        }else{
            res.send({error: 'No tienes permiso para realizar esto.'})
        }
    } catch (error) {
        return error
    }
}