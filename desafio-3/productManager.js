const fs = require('fs')

class ProductManager{
    constructor(path){
        this.path = path
    }
    async getProducts(){
        if(fs.existsSync(this.path)){
            const products = await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(products)
        }else{
            return []
        }
    }
    async getProductById(id){
        const products = await this.getProducts()
        const product = products.find(el => el.id === id)
        return product
    }
    async addProducts({title,description,price,thumbnail,stock}){
        const product = {
            id: await this.#generarId(),
            title,
            description,
            price,
            thumbnail,
            stock
        }
        const productFile = await this.getProducts()
        productFile.push(product)
        await fs.promises.writeFile(this.path,JSON.stringify(productFile))
    }
    async updateProduct(id,obj){
        const allProducts = await this.getProducts()
        const exceptProduct = allProducts.filter((el) => el.id !== id)
        const product = allProducts.find((el) => el.id === id)
        let llave = Object.keys(obj)[0]
        let valor = Object.values(obj)[0]
        product[llave] = valor
        exceptProduct.push(product)
        fs.writeFile(this.path, JSON.stringify(exceptProduct),(error)=>{
            if(!error){
                console.log('El producto se actualizo correctamente')
            }else{
                console.log(error)
            }
        })
    }
    async deleteProduct(id){
        const allProducts = await this.getProducts()
        const exceptProduct = allProducts.filter((el) => el.id !== id)
        fs.writeFile(this.path, JSON.stringify(exceptProduct),(error)=>{
            if(!error){
                console.log('El producto se actualizo correctamente')
            }else{
                console.log(error)
            }
        })
       
    }
    async #generarId(){
        const products = await this.getProducts()
        let id = 1;
        for(let i=0 ; i <= products.length  ; i++){
            id = i + 1 
        }
        return id
    }
}
const Manager = new ProductManager('products.json')