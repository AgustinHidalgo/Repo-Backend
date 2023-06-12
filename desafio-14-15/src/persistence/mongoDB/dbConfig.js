import mongoose from "mongoose";
import config from '../../config.js'

try {
    mongoose.connect(config.MONGO_URL)
    .then(()=> console.log('Conectado correctamente a la db'))
} catch (error) {
    console.log(error)   
}