import BasicMongo from "../BasicMongo.js";
import { cartModel } from '../../mongoDB/models/carts.model.js'
import { ProductsModel } from "../../mongoDB/models/products.model.js";

class CartsMongo extends BasicMongo{
  constructor(model){
    super(model)
  }

  async findByIdAndUpdate(pid, cid){
    try {
      const AllCarts = await this.model.find()
      const filter = AllCarts.filter((prod) => prod.id !== pid)
      const cart = await this.model.findByIdAndUpdate(cid,{
        products: filter
      })
      return cart
    } catch (error) {
      return error
    }
  };

  async AddProductToCart(cid ,pid){
    try {
      const prod = await ProductsModel.findById(pid)
      const price = prod.price
      const cart = await this.model.findById(cid)
      let index = cart.products.findIndex(prod => prod.pid = pid)
      if(index !== -1){
        cart.products[index].quantity++
      }else{
        cart.products.push({pid, quantity: 1, price})
      }
      await this.model.findByIdAndUpdate(cid,cart)
    } catch (error) {
      return error
    }
  };
}

export default new CartsMongo(cartModel)