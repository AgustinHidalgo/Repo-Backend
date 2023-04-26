import {saveProductService, getAllService} from '../service/products.service.js'

export const saveController = async (req,res) => {
    const {body} = req
    try {
        const product = await saveProductService(body)
        res.json(product)
    } catch (error) {
        console.log(error)
    }
}

export const getAllController = async (req,res) => {
    try {
        const products = await getAllService()
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}