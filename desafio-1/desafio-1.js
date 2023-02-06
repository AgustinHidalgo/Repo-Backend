class ProductManager{
    constructor(){
        this.listProducts = []
    }
    getProducts(){
        console.log(this.listProducts)
    }
    addProduct(title, description, price, thumbnail, code, stock, id){
        if(this.products.find((e) => e.code == code)){
            throw new Error ("El code esta repetido")
        }
        if(this.listProducts.length === 0){
            id = 1
        }
        else{
            id = this.listProducts.length + 1
        }
        
        
        this.listProducts.push( new Products({ title, description, price, thumbnail, code, stock, id}))
    }
    getProductsByID(productsId){
        const search = this.listProducts.find((prod) => Products.id === productsId)
        if(search == undefined){
            console.log("El producto no se encontro")

        }
        else{
            console.log(search)
        }

    }
} 




class Products{
    constructor(title = "producto prueba", description = "este es un producto prueba", price = 200, thumbnail = "Sin imagen", code, stock = 25, id){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = id
    }
}