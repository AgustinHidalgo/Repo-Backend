import mongoose from "mongoose"
import config from "../../config.js"


export const initMongoDb = async () =>{
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log('conectado a mongodb')
    } catch (error) {
        return error
    }
}

export default class mongoDB {
    constructor(collection, schema){
        this.collection = mongoose.model(collection,schema)
    }

    async save(doc){
        try {
            const document = await this.collection.create(doc);
            return document
        } catch (error) {
            return error
        }
    }

    async getAll(){
        try {
            const products = await this.collection.find({})
            return products
        } catch (error) {
            return error
        }
    }
}