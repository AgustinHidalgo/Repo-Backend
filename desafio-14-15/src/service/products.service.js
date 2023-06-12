import ProductsMongo from '../persistence/DAOS/productsDAO/productsMongo.js'

class ProductsService{
    constructor(dao){
        this.dao = dao
    }

    create = async (obj) => {
        const newProduct = await ProductsMongo.create(obj)
        return newProduct
    };
    
    findOne = async (id) => {
        const findOne = await ProductsMongo.findOne(id)
        return findOne
    };

    findAll = async () => {
        const findAll = await ProductsMongo.findAll()
        return findAll
    };

    updateOne = async (id,obj) => {
        const updateOne = await ProductsMongo.updateOne(id,obj)
        return updateOne
    };

    deleteById = async(id) => {
        const findById = await ProductsMongo.deleteById(id)
        return findById
    };
}

export default new ProductsService(ProductsMongo)