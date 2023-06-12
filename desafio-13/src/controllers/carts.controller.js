import cartService from "../service/cart.service.js";
import usersService from "../service/users.service.js";
import productsService from "../service/products.service.js";

class CartsController {
    create = async (req,res) => {
        const obj = req.body
        try {  
            const newCart = await cartService.create(obj)
            res.json({message:'Carrito creado con exito', newCart})
        } catch (error) {
            res.json({message:'Error en el carts controller CREATE'})
        }
    };

    findAll = async (req,res) => {
        try {
            const findAll = await cartService.findAll()
            res.json({message:'Carritos encontrados:', findAll})
        } catch (error) {
            res.json({message:'Error en el carts controller find all'})
        }
    };

    findOne = async (req,res) => {
        const { id } = req.params
        try {
            const findOne = await cartService.findOne(id)
            res.json({message:'Carrito encontrado con exito', findOne})
        } catch (error) {
            res.json({message:'Error en el carts controller find one'})
        }
    };

    updateOne = async (req,res) => {
        const {id} = req.params
        const {obj} = req.body
        try {
            const updateOne = await cartService.updateOne(id,obj)
            res.json({message:'Carrito actualzado con exito', updateOne})
        } catch (error) {
            res.json({message:'Error en el carts controller update one'})
        }
    };

    deleteById = async (req,res) => {
        const {id} = req.params
        try {
            const deleteById = await cartService.deleteById(id)
            res.json({message:'Carrito eliminado con exito', deleteById})
        } catch (error) {
            res.json({message:'Error en el carts controller  delete one'})
        }
    };

    deleteProductInCart = async (req,res) => {
        const {pid} = req.body
        const {cid} = req.params
        try {
            const deleteProductInCart = await cartService.deleteProductInCart(cid,pid)
            res.json({message:'Se elimino el producto con exito del carrito', deleteProductInCart})
        } catch (error) {
            res.json({message:'Error en el carts controller delete product in cart'})
        }
    };

    AddProductInCart = async (req,res) => {
        const {cid, pid} = req.params
        try {
            const AddProductInCart = await cartService.AddProductToCart(cid,pid)
            res.json({message:'Se agrego el producto con exito al carrito', AddProductInCart})
        } catch (error) {
            res.json({message:'Error en el carts controller add product'})
        }
    };

    createTicket = async (req,res) => {
        try {
            const newTicket = await cartService.createTicket(obj)
            res.json({message:'Orden creada con exito', newTicket})
        } catch (error) {
            res.json({message:'Error en el createTicket en cart controller'})
        }
    };
}

export default new CartsController()