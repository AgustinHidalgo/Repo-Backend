import Router from 'express'
import { saveController, getAllController } from '../controllers/products.controllers.js'

const ProductsRouter = Router()

ProductsRouter.post('/add', saveController);
ProductsRouter.get('/get', getAllController);

export default ProductsRouter