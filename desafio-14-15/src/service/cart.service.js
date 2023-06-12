import CartsMongo from '../persistence/DAOS/cartDAO/cartsMongo.js'

class CartsService{
    constructor(dao){
        this.dao = dao
    }

    create = async (obj) => {
        const newCart = await CartsMongo.create(obj)
        return newCart
    };

    createTicket = async (obj) => {
        const newTicket = await CartsMongo.createTicket(obj)
        return newTicket
    };
    
    findOne = async (id) => {
        const findOne = await CartsMongo.findOne(id)
        return findOne
    };

    findAll = async () => {
        const findAll = await CartsMongo.findAll()
        return findAll
    };

    updateOne = async (id,obj) => {
        const updateOne = await CartsMongo.updateOne(id,obj)
        return updateOne
    };

    deleteById = async(id) => {
        const findById = await CartsMongo.deleteById(id)
        return findById
    };

    deleteProductInCart = async(pid,cid) => {
        const deleteProductFromCart = await CartsMongo.findByIdAndUpdate(pid,cid)
        return deleteProductFromCart
    };

    AddProductToCart = async(cid,pid) => {
        const AddProduct = await CartsMongo.AddProductToCart(cid,pid)
        return AddProduct
    };
}

export default new CartsService(CartsMongo)