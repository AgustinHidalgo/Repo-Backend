import BasicMongo from "../BasicMongo.js";
import { ProductsModel } from '../../mongoDB/models/products.model.js'

class ProductsMongo extends BasicMongo{
  constructor(model){
    super(model)
  }
}

export default new ProductsMongo(ProductsModel)