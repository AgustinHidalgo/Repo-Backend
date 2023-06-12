import ticketService from "../service/ticket.service.js";
import usersService from "../service/users.service.js";
import { verifyToken } from "../utils.js";
import cartService from "../service/cart.service.js";
import logger from "../Utils/winston.js";

class TicketsController{
    
    create = async (req,res) =>{
        const { cid } = req.params
        try {
            const token = req.headers.authorization.split(' ').pop()
            const tokenData = await verifyToken(token)
            const user = tokenData.user.email
            const resultUser = await usersService.findById(tokenData.user._id)
            const resultCart = await cartService.findOne(cid)
            const actualTicket = resultCart.products.filter((p) => p.id === resultCart.products.pid )
            console.log(actualTicket)
            let total = actualTicket.reduce((acc,prev) => {
                acc+=prev.price * prev.quantity
                return acc
            },0)
            logger.info(total)
            let codeTicket = Date.now() + Math.floor(Math.random() * 10000 + 1);
            let ticket = {
                code : codeTicket,
                user: user,            
                total: total
            }
            let result = await ticketService.createTicket(ticket)
            resultUser.tickets.push(result._id)
            await usersService.updateOne(tokenData.user._id, resultUser)
            res.json({message:'ticket creado', result}) 
        } catch (error) {
            res.json({message:'Error en create tickets controller'})
        }
    };
    findOne = async (req,res) =>{
        const {id} = req.params
        try {
            const findOne = await ticketService.findOne(id)
            return findOne
        } catch (error) {
            res.json({message:'Error en el findOneOrderController'})
        }
    };
    findAll= async (req,res) =>{
        try {
            const findAll = await ticketService.findAll()
            return findAll
        } catch (error) {
            return res.json({message:'Error en el findAllOrderController'})
        }
    };
    updateOne = async (req,res) =>{
        const {id} = req.params;
        const obj = req.body
        try {  
            const updateOne = await ticketService.updateOne(id,obj)
            return updateOne
        } catch (error) {
            res.json({message:'Error en updateOneOrderController'})
        }
    };
    deleteById = async (req,res) =>{
        const {id} = req.params;
        try {
            const deleteOne = await ticketService.deleteById(id)
            return deleteOne
        } catch (error) {
            res.json({message:'Error en el deleteByIdOrderController'})
        }
    };
}

export default new TicketsController()