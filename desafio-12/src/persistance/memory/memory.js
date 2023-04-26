export default class Memory {
    constructor(){
        this.products = []
    }

    async save(obj){
        const objeto =   this.products.push(obj);
        return objeto;
    }

    async getAll(){
        return this.products;
    }
}