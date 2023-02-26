import fs from 'fs'
import {__dirname} from './utils.js'
const path = __dirname+'/products.json' 

export default class ProductManager{
    constructor(){
        this.products = []
        this.getProducts()
    }

    getProducts(){
        if(fs.existsSync(path)){
            const productsJson = fs.readFileSync(path,'utf-8')
            return JSON.parse(productsJson)
        }else{
            fs.writeFileSync(path, JSON.stringify(this.products))
        }
    }

    createProduct(nombre,description,price,stock,category){
        const product = {
            nombre,
            description,
            price,
            stock,
            category
        }
        this.products.push(product)
        let productsJson = fs.writeFileSync(path,JSON.stringify(this.products))
        return productsJson
    }

    deleteProduct(pid){
        let restProducts = []
        this.products.forEach((p)=>{
            if(p.id !== pid){
                restProducts.push(p)
            }else{
                console.log('esta mal la funcion')
            }
        })
        return restProducts
    }
}